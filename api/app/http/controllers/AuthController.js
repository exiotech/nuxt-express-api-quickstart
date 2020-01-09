import express from 'express';
import passport from 'passport';
import * as validators from 'validators/auth';
import BaseController from 'controllers/_BaseController';

import NotFoundError from 'exceptions/NotFoundError';
import ForbiddenError from 'exceptions/ForbiddenError';
import { createJwtToken } from 'services/auth';
import {
    createUser,
    addResetToken,
    resetPassword,
    changeCurrentPassword
} from 'services/users';
import { STRATEGIES } from 'const/auth';
import { createHash } from 'lib/utils';
import { sendMail } from 'services/email';
import User from 'model/User';

class AuthController extends BaseController {
  constructor(app) {
    super();
    this._strategies = STRATEGIES;
  }

  registerRoutes(app) {
    const router = express.Router();
    router.post('/:model?/login', validators.login, this.login.bind(this));
    router.post('/register', validators.register, this.register.bind(this));
    router.post('/reset', this.reset.bind(this));
    router.get('/reset/:token', this.showResetPasswordForm.bind(this));
    router.post('/reset/:token', this.saveNewPassword.bind(this));
    router.post('/change-password/:id', this.changePassword.bind(this));

    app.use('/auth', router);
  }

  login(req, res, next) {
    if (req.params.model && !this._strategies.includes(req.params.model)) {
      return next(new NotFoundError('Model not found'));
    }
    passport.authenticate(req.params.model || 'user', (err, user) => {
      if (err) {
        res.status(500).json(err);
      }
      if (!user) {
        return next(
          new ForbiddenError('Incorrect credentials. Authentication failed.')
        );
      }
      User.populate(user, { path: 'promoCode' })
        .then(user => {
          if (req.device) {
            req.device.user = user;
            req.device.save();
          }
          res.json(
            this._createResponse({
              token: createJwtToken(user),
              user
            })
          );
        })
        .catch(next);
    })(req, res);
  }

  register(req, res, next) {
    createUser(req.body, req)
      .then(user => {
        res.json(this._createResponse({
          token: createJwtToken(user),
          user,
        })).status(201);
      })
      .catch(next);
  }

  reset(req, res, next) {
    const token = createHash();
    return addResetToken(req.body.email, token)
      .then(_ => {
        return sendMail(
          req.body.email,
          'Mon Amie password change',
          `${process.env.APP_URL}/auth/reset/${token}`
        );
      })
      .then(_ => {
        res.json(this._createResponse({ message: 'done' }));
      })
      .catch(next);
  }

  showResetPasswordForm(req, res, next) {
    res.render('change_password', {
      resetToken: req.params.token,
      url: `${process.env.APP_URL}/auth/reset/${req.params.token}`
    });
  }

  saveNewPassword(req, res, next) {
    if (req.body.password !== req.body.confirmPassword)
      throw new Error('Passwords do not match');

    return resetPassword(req.params.token, req.body.password)
      .then(_ => {
        res.render('pass_success', { msg: 'done' });
      })
      .catch(next);
  }

  changePassword(req, res, next) {
    if (req.body.password !== req.body.confirmPassword)
      throw new Error('Passwords do not match');

    return changeCurrentPassword(req.params.id, req.body.password)
      .then(_ => res.json(this._createResponse({ message: 'done' })))
      .catch(next);
  }
}

export default new AuthController();

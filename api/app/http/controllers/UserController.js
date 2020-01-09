import validators from 'validators/users';
import CRUDController from './_CRUDController';
import { hasPermission } from 'middleware/HasPermission';
import { USER_ROLES } from 'const/user';

import {
  queryUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  me,
  updateMe
} from 'services/users';

class UserController extends CRUDController {
  constructor() {
    super();
    this._modelName = 'User';
    this._path = '/users';
    this._validators = validators;

    this._query = { function: queryUsers, roles: [USER_ROLES.ADMIN] };
    this._getModel = { function: getSingleUser, roles: [USER_ROLES.ADMIN] };
    this._createModel = { function: createUser, roles: [USER_ROLES.ADMIN] };
    this._updateModel = { function: updateUser, roles: [USER_ROLES.ADMIN] };
    this._deleteModel = { function: deleteUser, roles: [USER_ROLES.ADMIN] };

    this._getMe = { function: me, roles: ['*'] };
    this._updateMe = { function: updateMe, roles: ['*'] };
    this._additionalRoutes = [];
  }

  _addRoutes(router) {
    router.get(
      '/me',
      hasPermission(this._getMe.roles),
      this.getCurrentUser.bind(this)
    );
    router.put(
      '/me',
      hasPermission(this._updateMe.roles),
      this._validators.updateCurrent,
      this.updateCurrentUser.bind(this)
    );
  }

  getCurrentUser(req, res, next) {
    this._getMe
      .function(req.user._id)
      .then(user => {
        res.json(this._createResponse(user));
      })
      .catch(next);
  }

  updateCurrentUser(req, res, next) {
    this._updateMe
      .function(req.user._id, req.body)
      .then(user => {
        res.json(this._createResponse(user));
      })
      .catch(next);
  }
}

export default new UserController();

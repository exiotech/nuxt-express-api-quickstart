import express from 'express';
import AuthController from 'controllers/AuthController';
import UserController from 'controllers/UserController';

import faker from 'faker';

module.exports = app => {
  const router = express.Router();
  AuthController.registerRoutes(router);
  UserController.registerRoutes(router);

  app.use('/v1', router);
  return router;
};

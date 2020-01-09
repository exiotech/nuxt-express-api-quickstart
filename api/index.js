require('dotenv').config();
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import expressJwt from 'express-jwt';
import cors from 'cors';
import { Joi, errors } from 'celebrate';
import config from 'config';

const app = express();

require('./db').connect();

// require('./jobs').start();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  expressJwt({ secret: config.jwt.key }).unless({
    path: [
      /\/auth\/(.*)/gi,
    ]
  })
);

app.use(errors());

require('dotenv').config();
require('./routes')(app);
require('./config/auth').default(app);
require('./routes/errors')(app);

module.exports = app;

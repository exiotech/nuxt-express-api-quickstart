import { celebrate, Joi } from 'celebrate';

export const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .label('Email'),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .label('Password')
  })
});

export const register = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().label('First Name'),
    lastName: Joi.string().label('Last Name'),
    email: Joi.string()
      .required()
      .label('Email'),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .label('Password'),
    dob: Joi.date()
      .iso()
      .label('Dob'),
    phone: Joi.string().label('Phone')
  })
});

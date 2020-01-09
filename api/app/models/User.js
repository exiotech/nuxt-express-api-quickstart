import mongoose from 'mongoose';

import BaseSchema from 'model/BaseSchema';
import ValidationError from 'exceptions/ValidationError';
import { Schema } from 'mongoose';
import { hashPassword, generateSalt } from 'lib/security';

const UserSchema = BaseSchema.extend({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: false,
    },
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  resetToken: {
    type: String,
    default: null,
  },
  _password: {
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    hashed: {
      type: Boolean,
      default: false,
    },
  },
}, {
  toJSON: {
    transform(doc, ret) {
      Reflect.deleteProperty(ret, '_id');
      Reflect.deleteProperty(ret, '__v');
      Reflect.deleteProperty(ret, '__t');
      Reflect.deleteProperty(ret, '_password');
      Reflect.deleteProperty(ret, 'deleted');
      Reflect.deleteProperty(ret, 'resetToken');
      /* eslint-disable no-param-reassign */
      ret.id = doc._id;
      ret.fullName = doc.fullName;
    }
  }
});

UserSchema.virtual('token').get(function() {
  return {
    _id: this._id,
    role: this.role
  };
});

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim() || undefined;
});

UserSchema.virtual('password').set(function(value) {
  this._password = {
    hash: value,
    salt: generateSalt(),
    hashed: false
  };
});

UserSchema.pre('validate', function(next) {
  this.constructor
    .exists({
      _id: { $ne: this._id },
      email: this.email
    })
    .then(exists => {
      if (exists) {
        next(new ValidationError('Email already exists'));
      }
      next();
    });
});

UserSchema.pre('save', function(next) {
  if (this._password.hashed) {
    return next();
  }
  return hashPassword(this._password.hash, this._password.salt)
    .then(passwordHash => {
      this._password.hash = passwordHash;
      this._password.hashed = true;
      next();
    })
    .catch(next);
});

UserSchema.methods.verifyPassword = function(password) {
  return hashPassword(password, this._password.salt).then(
    passwordHash => this._password.hash === passwordHash
  );
};

export default mongoose.model('User', UserSchema);

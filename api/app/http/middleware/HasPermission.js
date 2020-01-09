import mongoose from 'mongoose';
import ForbiddenError from 'exceptions/ForbiddenError';

export function hasPermission(roles) {
  return (req, _, next) => {
    if (roles.indexOf('*') !== -1) {
      return next();
    }

    if (roles && roles.length !== 0 && roles.indexOf(req.user.role) === -1) {
      return next(new ForbiddenError());
    }

    return next();
  };
}

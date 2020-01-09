import mongoose from 'mongoose';
import NotFoundError from 'exceptions/NotFoundError';

export default function ExistingModel(model) {
  return (req, res, next) => {
    mongoose
      .model(model)
      .exists(req.params.id)
      .then(exists => {
        if (!exists) {
          throw new NotFoundError(
            `${model} with id ${req.params.id} doesn't exist!`
          );
        }
        next();
      })
      .catch(next);
  };
}

import mongoose from 'mongoose';
import config from 'config';

export function connect() {
  return mongoose
    .connect(
      config.db.connectionSring,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .catch(err => {
      console.error('Error connecting Database');
      console.error(err);
    });
}

export default mongoose;

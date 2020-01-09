require('dotenv').config();
import { JWT_SERVICE } from 'const/services';

module.exports = {
  db: {
    connectionSring: 'mongodb://localhost:27017/quick-start'
  },
  jwt: {
    key: process.env.JWT_CLIENT_KEY,
    transactionKey: process.env.JWT_TRANSACTION_KEY,
    expires: JWT_SERVICE.expires,
    leadExpires: JWT_SERVICE.leadExpires,
    issuer: JWT_SERVICE.issuer,
  }
};

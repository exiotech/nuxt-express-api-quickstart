import { seedUsersTable } from './users';

require('dotenv').config();
require('../').connect();

function sleep(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function seed() {
  await seedUsersTable();
  return true;
}

seed().then(() => {
  process.exit();
});

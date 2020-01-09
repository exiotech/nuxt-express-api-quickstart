import { capitalize } from 'lodash';
import Log from 'lib/logger';
import User from 'model/User';
import { USER_ROLES } from 'const/user';
import { createUser } from 'services/users';

export async function seedUsersTable() {
  try {
    await Promise.all(
      Object.keys(USER_ROLES).map(role =>
        createUser({
          firstName: 'Demo',
          lastName: capitalize(role),
          email: `${USER_ROLES[role]}@gmail.com`,
          password: 'secret',
          role: USER_ROLES[role],
        })
      )
    );
  } catch (e) {
    Log.error(e);
  }
}

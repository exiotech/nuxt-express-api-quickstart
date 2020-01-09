import User from 'model/User';
import { parseQueryOptions } from 'lib/utils';
import NotFoundError from 'exceptions/NotFoundError';

export function queryUsers(params) {
  const options = parseQueryOptions(params);
  const query = {};
  if (params.id) {
    query._id = params.id;
  }
  if (params.search) {
    query.$or = [{
      firstName: new RegExp(params.search, 'gi'),
    }, {
      lastName: new RegExp(params.search, 'gi'),
    }, {
      email: new RegExp(params.search, 'gi'),
    }];
  }
  if (params.firstName) {
    query.firstName = {
      $regex: new RegExp(params.firstName, 'gi'),
    };
  }
  if (params.lastName) {
    query.lastName = {
      $regex: new RegExp(params.lastName, 'gi'),
    };
  }
  if (params.username) {
    query.username = {
      $regex: new RegExp(params.username, 'gi'),
    };
  }
  if (params.role) {
    query.role = params.role;
  }
  return User.paginate(query, options).then(result => {
    const data = {
      ...result,
      users: result.docs,
    };
    delete data.docs;
    return data;
  });
}

export function getSingleUser(id) {
  return User.findById(id);
}

export function findUserByEmail(email) {
  return User.findOne({ email }).then(user => {
    if (!user) throw new NotFoundError('User not found');
    return user;
  });
}

export async function createUser(data) {
  return User.create(data).then(user => {
    return user;
  });
}

export function updateUser(id, data) {
  return User.findById(id).then(user => {
    if (!user) {
      return;
    }
    user.mergeWithData(data);
    return user.save();
  });
}

export function deleteUser(id, deletedBy) {
  return User.findById(id).then(user => user.delete(deletedBy));
}

export function addResetToken(email, token) {
  return User.findOne({ email }).then(user => {
    if (!user) throw new NotFoundError('User not found');
    user.resetToken = token;
    return user.save();
  });
}

export function resetPassword(token, password) {
  return User.findOne({ resetToken: token }).then(user => {
    if (!user) throw new NotFoundError('User not found');
    user.password = password;
    user.resetToken = null;
    return user.save();
  });
}

export function changeCurrentPassword(id, password) {
  return User.findById(id).then(user => {
    if (!user) throw new NotFoundError('User not found!');
    user.password = password;
    user.resetToken = null;
    return user.save();
  });
}

export const me = async id => {
  return getSingleUser(id).then(user => {
    const data = {};
    data.user = user;
    return data;
  });
};

export const updateMe = async (id, data) => {
  return updateUser(id, data).then(user => {
    const data = {};
    data.user = user;
    return data;
  });
};

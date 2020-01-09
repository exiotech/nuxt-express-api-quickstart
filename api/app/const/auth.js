import User from 'model/User';

export const STRATEGIES = ['user', 'admin'];

export const STRATEGY_MODEL = {
  user: User,
  admin: User
};

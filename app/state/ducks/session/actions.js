import types from './types';

const login = (email, password) => ({
  type: types.LOGIN,
  meta: {
    async: true,
    path: 'http://localhost:1234/login',
    body: {
      email,
      password,
    },
    method: 'POST',
  },
});

export default {
  login,
};

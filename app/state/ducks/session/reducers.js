import { combineReducers } from 'redux';
import types from './types';
import { createReducer } from '../../utils';

const authReducer = createReducer(false)({
  [types.LOGIN_COMPLETED]: () => true,
  [types.LOGIN_FAILED]: () => false,
});

export default combineReducers({
  isAuthenticated: authReducer,
});

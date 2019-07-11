import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistReducer /* , persistStore */ } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // sets storage to session storage;
import sessionTypes from './ducks/session/types';
import * as reducers from './ducks';
import { apiService, createLogger } from './middlewares';

export default function configureStore() {
  const combinedReducers = combineReducers(reducers);

  // this reducer restores state to default values on logout, basically wiping it
  const rootReducer = (state, action) => {
    if (action.type === sessionTypes.LOGOUT) {
      // eslint-disable-next-line no-param-reassign
      state = undefined;
    }

    return combinedReducers(state, action);
  };

  const persistConfig = {
    key: 'root',
    storage,
    blackList: ['session.passwordRecoveryEnabled'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  function devToolsInstalled() {
    return typeof window === 'object'
      && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'; // eslint-disable-line no-underscore-dangle
  }


  const composeEnhancers = devToolsInstalled()
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose; // eslint-disable-line no-underscore-dangle

  return createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(
      apiService,
      thunkMiddleware,
      createLogger(true),
    )),
  );
}

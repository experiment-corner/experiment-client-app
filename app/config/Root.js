import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import App from '../components/app';
import configureStore from '../state/store';

const reduxStore = configureStore();
const persistor = persistStore(reduxStore);
window.persistor = persistor;

const Root = () => {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route path="/" component={App} exact />
          </Switch>
        </Router>
      </PersistGate>

    </Provider>
  );
};

export default Root;


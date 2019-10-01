import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from '../app/components/app';
import configureStore from '../app/state/store';

const reduxStore = configureStore();

const persistor = persistStore(reduxStore);
// console.log( "persistor", persistor );

window.persistor = persistor;
const app = document.getElementById('root');
const jsx = (
  <Provider store={reduxStore}>
    <PersistGate loading={null} persistor={persistor} >
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

ReactDOM.render(jsx, app);

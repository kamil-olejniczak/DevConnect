import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from "./store/store";
import {Provider} from 'react-redux';

const app = (
  <Provider store={store}>
    <App/>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

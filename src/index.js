import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-image-crop/dist/ReactCrop.css';
import {StripeProvider} from 'react-stripe-elements';

import { Provider } from 'react-redux';
import store from './store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();

ReactDOM.render(
  <StripeProvider apiKey='pk_test_3B3ksIMI2sXXfLBK1gCijhgZ'>
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  </StripeProvider>,
  document.getElementById('root')
);

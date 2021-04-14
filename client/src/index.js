import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import 'semantic-ui-css/semantic.min.css';
import './polyfills';

import App from './App';

import './assets/styles/app.scss';

ReactDOM.render(
  <Router>
    <App />
  </Router>, document.getElementById('root'),
);

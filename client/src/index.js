import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './polyfills';
import { LoggedInProvider } from './context/LoggedIn';
import App from './App';
import './assets/styles/app.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <LoggedInProvider>
    <Router>
      <App />
    </Router>
  </LoggedInProvider>, document.getElementById('root'),
);
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './polyfills';
import { GeneralProvider } from './context/General';
import App from './App';
import './assets/styles/app.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <GeneralProvider>
    <Router>
      <App />
    </Router>
  </GeneralProvider>, document.getElementById('root'),
);
registerServiceWorker();

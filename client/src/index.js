import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './polyfills';
import { LoggedInProvider } from './context/LoggedIn';
import App from './App';
import './assets/styles/app.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LoggedInProvider><App /></LoggedInProvider>, document.getElementById('root'));
registerServiceWorker();

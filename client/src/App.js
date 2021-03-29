import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './config';
import Home from './components/Home';
import Messages from './components/Messages';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

const oktaAuth = new OktaAuth(config.oidc);

const App = () => (
  <Router>
    <Security oktaAuth={oktaAuth}>
      <Navbar />
      <Container text style={{ marginTop: '7em' }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login/callback" component={LoginCallback} />
          <SecureRoute path="/messages" component={Messages} />
          <SecureRoute path="/profile" component={Profile} />
        </Switch>
      </Container>
    </Security>
  </Router>
);
export default App;

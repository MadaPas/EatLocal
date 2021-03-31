import React, { useState } from 'react';
import {
  Route, Switch, useHistory, Redirect,
} from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './config';
import Home from './components/Home';
import Messages from './components/Messages';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import AllBoxes from './components/AllBoxes';
import Box from './components/Box';

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const [box, setBox] = useState();
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Navbar />
      <Container text style={{ marginTop: '7em' }}>
        <Switch>
          <Route path="/">
            <Home />
            <AllBoxes setBox={setBox} />
            {box ? <Redirect to="/box" /> : null}
          </Route>

          <Route path="/box"><Box box={box} /></Route>
          <Route path="/login/callback" component={LoginCallback} />
          <Route path="/boxes" component={AllBoxes} />
          <SecureRoute path="/messages" component={Messages} />
          <SecureRoute path="/profile" component={Profile} />
        </Switch>
      </Container>
    </Security>
  );
};
export default App;

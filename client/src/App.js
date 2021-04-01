/* eslint-disable no-console */
import React from 'react';
import {
  Route, Switch, useHistory,
} from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import { GeneralProvider } from './context/General';
import config from './config';
import Home from './components/Home';
import Messages from './components/Messages';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import AllBoxes from './components/AllBoxes';
import Box from './components/Box';
import Checkout from './components/Checkout';

const oktaAuth = new OktaAuth(config.oidc);
// restoreOriginalUri={restoreOriginalUri}, toRelativeUrl
const App = () => {
  const history = useHistory();
  console.log(history);
  // const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  //   setTimeout(() => { console.log('redirecting to messages'); }, 3000);
  //   history.push('/messages');
  //   history.replace(toRelativeUrl(originalUri, window.location.origin));
  // };
  return (
    <Security oktaAuth={oktaAuth}>
      <GeneralProvider>
        <Navbar />
        <Container text style={{ marginTop: '7em' }}>
          <Switch>
            <Route exact path="/">
              <Home />
              <AllBoxes />
            </Route>

            <Route path="/box/:boxId"><Box /></Route>
            <SecureRoute path="/checkout"><Checkout /></SecureRoute>
            <SecureRoute path="/cart"><Checkout /></SecureRoute>
            <Route path="/login/callback" component={LoginCallback} />
            <Route path="/boxes" component={AllBoxes} />
            <SecureRoute path="/messages" component={Messages} />
            <SecureRoute path="/profile" component={Profile} />
          </Switch>
        </Container>
      </GeneralProvider>
    </Security>
  );
};
export default App;

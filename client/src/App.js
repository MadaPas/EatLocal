/* eslint-disable no-console */
import React from 'react';
import {
  Route, Switch, useHistory,
} from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import StripeContainer from './Stripe/StripeContainer';
import { GeneralProvider } from './context/General';
import config from './config';
import Home from './components/Home';
import Messages from './components/Messages';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import AllBoxes from './components/AllBoxes';
import Box from './components/Box';
// import Checkout from './components/Checkout';
import Cart from './components/Cart';
import Success from './components/Success';
import Fail from './components/Fail';

const oktaAuth = new OktaAuth(config.oidc);
const App = () => {
  const history = useHistory();
  console.log(history);
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <GeneralProvider>
        <Navbar />
        <Container text style={{ marginTop: '7em' }}>
          <Switch>
            <Route exact path="/">
              <Home />
              <AllBoxes />
            </Route>
            <Route path="/box/:boxId"><Box /></Route>
            <SecureRoute path="/checkout">
              <StripeContainer />
              {/* <Checkout /> */}
            </SecureRoute>
            <SecureRoute path="/cart"><Cart /></SecureRoute>
            <SecureRoute path="/success"><Success /></SecureRoute>
            <SecureRoute path="/fail"><Fail /></SecureRoute>
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

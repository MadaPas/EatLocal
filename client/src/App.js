/* eslint-disable no-console */
import React from 'react';
import {
  Route, Switch, useHistory,
} from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import StripeContainer from './components/Stripe/StripeContainer';
import { GeneralProvider } from './context/General';
import config from './config';
import Home from './components/Home';
import Navbar from './components/Partials/Navbar';
import Profile from './components/Profile';
import AllBoxes from './components/Boxes/AllBoxes';
import Map from './components/Map/Map';
import Cart from './components/Stripe/Cart';
import Support from './components/Support';
import Apply from './components/Apply';
import Footer from './components/Partials/Footer';

const oktaAuth = new OktaAuth(config.oidc);
const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <GeneralProvider>
        <Navbar />
        <main className="main">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/boxes" component={AllBoxes} />
            <SecureRoute path="/checkout">
              <StripeContainer />
            </SecureRoute>
            <SecureRoute path="/cart">
              <Cart />
            </SecureRoute>
            <Route path="/login/callback" component={LoginCallback} />
            <Route path="/farmers" component={Map} />
            <Route path="/contact" component={Support} />
            <Route path="/apply" component={Apply} />
            <SecureRoute path="/profile" component={Profile} />
          </Switch>
        </main>
        <Footer />
      </GeneralProvider>
    </Security>
  );
};
export default App;
//
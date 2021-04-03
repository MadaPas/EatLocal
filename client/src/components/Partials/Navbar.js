import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Icon, Image, Menu,
} from 'semantic-ui-react';

const Navbar = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Image size="mini" src="/react.svg" />
            &nbsp;
            <Link to="/">EatLocal</Link>
          </Menu.Item>

          {authState.isAuthenticated && (
          <Menu.Item id="messages-button">
            <Icon name="mail outline" />
            <Link to="/messages">Messages</Link>
          </Menu.Item>
          )}

          {authState.isAuthenticated && (
            <Menu.Item id="profile-button">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
          )}

          {authState.isAuthenticated && (
            <Menu.Item id="logout-button" onClick={logout}>Logout</Menu.Item>
          )}

          {!authState.isPending && !authState.isAuthenticated && (
            <Menu.Item onClick={login}>Login</Menu.Item>
          )}

          {authState.isAuthenticated && (
            <Menu.Item id="checkout-button">
              <Link to="/cart">Cart</Link>
            </Menu.Item>
          )}

          <Menu.Item id="farmers">
            <Link to="/farmers">Our Farmers</Link>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};
export default Navbar;

/* eslint-disable max-len */
import { useOktaAuth } from '@okta/okta-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Menu,
} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import '../../assets/styles/_navbar.scss';

const Navbar = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <Menu fixed="top" inverted>
        <Container>
          <div className="logo">
            <Menu header>
              <Link to="/">
                <span className="logo__eat">Eat</span>
                <span className="logo__local">Local</span>
              </Link>
            </Menu>
          </div>

          <div className="navigation">
            <Menu.Item id="boxes">
              <Link to="/boxes">Boxes</Link>
            </Menu.Item>

            <Menu.Item id="farmers">
              <Link to="/farmers">Our Farmers</Link>
            </Menu.Item>

            <Menu.Item id="support">
              <Link to="/contact">Contact</Link>
            </Menu.Item>

            {!authState.isPending && !authState.isAuthenticated && (
              <Menu.Item onClick={login}>Login</Menu.Item>
            )}

            {authState.isAuthenticated && (
              <Menu.Item id="checkout-button">
                <Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link>
              </Menu.Item>
            )}
            {authState.isAuthenticated && (
              <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                <FontAwesomeIcon icon={faUser} />
                <div className={open ? 'open' : 'closed'}>
                  <Menu.Item id="profile-button">
                    <Link to="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item id="logout-button" onClick={logout}>Logout</Menu.Item>
                </div>
              </div>
            )}
          </div>

        </Container>
      </Menu>
    </header>
  );
};
export default Navbar;

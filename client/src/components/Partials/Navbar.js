/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import { useOktaAuth } from '@okta/okta-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <span className="logo__eat">Eat</span>
            <span className="logo__local">Local</span>
          </Link>
        </div>

        <div className="navigation">
          <Link to="/boxes">Boxes</Link>

          <Link to="/farmers">Our Farmers</Link>

          <Link to="/contact">Contact</Link>

          {!authState.isPending && !authState.isAuthenticated && (
          <div onClick={login}>
            Login
          </div>
          )}

          {authState.isAuthenticated && (
          <Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link>
          )}
          {authState.isAuthenticated && (
          <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <FontAwesomeIcon icon={faUser} />
            <div className={open ? 'open' : 'closed'}>
              <Link to="/profile">Profile</Link>
              <div id="logout-button" onClick={logout}>Logout</div>
            </div>
          </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;

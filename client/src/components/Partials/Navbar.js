/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import { useOktaAuth } from '@okta/okta-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();
  const [open, setOpen] = useState(false);
  const [burger, setBurger] = useState(false);
  return (
    <header className="header">
      <div className="header-content" id="header-content">
        <div className="logo">
          <Link to="/">
            <span className="logo__eat">Eat</span>
            <span className="logo__local">Local</span>
          </Link>
        </div>
        <MediaQuery maxWidth={768}>
          <div className="bars" onMouseEnter={() => setBurger(true)} onMouseLeave={() => setBurger(false)}>
            <FontAwesomeIcon className="bars-icon" icon={faBars} />
            <div className={burger ? 'bars-burger' : 'bars-burger closed'}>
              <Link to="/boxes">Boxes</Link>

              <Link to="/farmers">Farmers</Link>

              <Link to="/contact">Contact</Link>

              {!authState.isPending && !authState.isAuthenticated && (
                <span className="nav-login" onClick={login}>
                  Login
                </span>
              )}

              <Link className="nav-cart" to="/cart">Cart</Link>
              {authState.isAuthenticated && (
                <>
                  <Link to="/profile">Profile</Link>
                  <div className="nav-logout" id="logout-button closed" onClick={logout}>Logout</div>
                </>
              )}
            </div>
          </div>
        </MediaQuery>
        <MediaQuery minWidth={769}>
          <div className="navigation">
            <Link to="/boxes">Boxes</Link>

            <Link to="/farmers">Farmers</Link>

            <Link to="/contact">Contact</Link>

            {!authState.isPending && !authState.isAuthenticated && (
              <span className="nav-login" onClick={login}>
                Login
              </span>
            )}

            <Link className="nav-cart" to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link>

            {authState.isAuthenticated && (
              <div className="nav-person" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                <div className="nav-person-content">
                  <FontAwesomeIcon className="nav-icon" icon={faUser} />
                  <div className={open ? 'dropdown' : 'dropdown closed'}>
                    <Link to="/profile">Profile</Link>
                    <div className="nav-logout" id="logout-button" onClick={logout}>Logout</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </MediaQuery>
      </div>
    </header>
  );
};
export default Navbar;

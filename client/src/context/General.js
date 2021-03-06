/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useOktaAuth } from '@okta/okta-react';

export const GeneralContext = createContext();

export const GeneralProvider = props => {
  const { children } = props;
  const { authState, oktaAuth } = useOktaAuth();
  const [loggedIn, setLoggedIn] = useState();
  const [userData, setUserData] = useState([]);
  const [allBoxes, setAllBoxes] = useState();
  const [allFarmers, setAllFarmers] = useState();

  const [order, setOrder] = useState(() => JSON.parse(localStorage.getItem('foodBox')) || []);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    localStorage.setItem('foodBox', JSON.stringify(order));
  }, [order]);

  useEffect(() => (authState.isAuthenticated ? setLoggedIn(authState) : setLoggedIn(null)), [authState, oktaAuth]);

  useEffect(() => {
    if (!allBoxes) {
      const fetchData = async () => {
        const response = await fetch('https://server-eatlocal-m4j.herokuapp.com/api/boxes/');
        const allBoxesJson = await response.json();
        setAllBoxes(allBoxesJson);
      };
      fetchData();
    }
  }, [allBoxes]);

  useEffect(() => {
    if (!allFarmers) {
      const fetchData = async () => {
        const response = await fetch('https://server-eatlocal-m4j.herokuapp.com/api/farmers/');
        const allFarmersJson = await response.json();
        setAllFarmers(allFarmersJson);
      };
      fetchData();
    }
  }, [allFarmers]);

  useEffect(() => {
    if (loggedIn) {
      const fetchData = async () => {
        const response = await fetch('https://server-eatlocal-m4j.herokuapp.com/api/orders/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
          },
          method: 'POST',
          body: JSON.stringify({ oktaId: loggedIn.accessToken.claims.uid }),
        });
        const newOrderHistory = await response.json();
        setOrderHistory(newOrderHistory);
      };
      fetchData();
    }
  }, [loggedIn, order]);

  useEffect(() => {
    if (loggedIn) {
      const userInfo = loggedIn.accessToken.claims;
      const userObj = {
        oktaId: userInfo.uid,
        email: userInfo.sub,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
        pm: userInfo.pm,
      };
      const fetchData = async () => {
        try {
          const userResponse = await fetch('https://server-eatlocal-m4j.herokuapp.com/api/users/user', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
            },
            method: 'POST',
            body: JSON.stringify(userObj),
          });
          const user = await userResponse.json();
          if (userResponse.status === 404) {
            const userRegistration = await fetch('https://server-eatlocal-m4j.herokuapp.com/api/users/register', {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
              },
              method: 'POST',
              body: JSON.stringify(userObj),
            });
            const newUser = await userRegistration.json();
            setUserData([newUser]);
          } else {
            setUserData([user]);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [loggedIn, setLoggedIn]);

  return (
    <GeneralContext.Provider value={{
      setLoggedIn, allBoxes, setOrder, order, userData, setUserData, loggedIn, orderHistory, allFarmers,
    }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

GeneralProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.any,
    ),
    PropTypes.object,
  ]).isRequired,
};

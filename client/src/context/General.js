import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const GeneralContext = createContext();

export const GeneralProvider = props => {
  const { children } = props;
  const [loggedIn, setLoggedIn] = useState();
  const [userData, setUserData] = useState();
  const [allBoxes, setAllBoxes] = useState();

  useEffect(() => {
    if (!allBoxes) {
      const fetchData = async () => {
        const response = await fetch('http://localhost:8001/api/boxes/');
        const allBoxesJson = await response.json();
        setAllBoxes([allBoxesJson]);
      };
      fetchData();
    }
  }, [allBoxes]);

  useEffect(() => {
    if (loggedIn) {
      const userInfo = loggedIn.accessToken.claims;
      const userObj = {
        okta_id: userInfo.uid,
        email: userInfo.sub,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
      };
      const fetchData = async () => {
        try {
          const userResponse = await fetch('http://localhost:8001/api/users/user', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${loggedIn.accessToken.accessToken}`,
            },
            method: 'POST',
            body: JSON.stringify(userObj),
          });
          const user = await userResponse.json();
          if (userResponse.status === 404) {
            const userRegistration = await fetch('http://localhost:8001/api/users/register', {
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
  }, [loggedIn]);
  console.log(userData, 'test');
  console.log(allBoxes, 'fetching boxes');
  return (
    <GeneralContext.Provider value={{ setLoggedIn, allBoxes }}>
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

import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const LoggedInContext = createContext();

export const LoggedInProvider = props => {
  const { children } = props;
  const [loggedIn, setLoggedIn] = useState();
  const [userData, setUserData] = useState();

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
    //     .then(response => {
    //       if (!response.ok) {
    //         return Promise.reject();
    //       }
    //       return response.json();
    //     })
    //     .then(data => {
    //       console.log(data, 'DATA');
    //       setUserData([data]);
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    //   console.log(loggedIn, userInfo, userObj, 'in loggedIn.js');
  }, [loggedIn]);
  console.log(userData, 'test');

  return (
    <LoggedInContext.Provider value={{ setLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};

LoggedInProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.any,
    ),
    PropTypes.object,
  ]).isRequired,
};

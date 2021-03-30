import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const LoggedInContext = createContext();

export const LoggedInProvider = props => {
  const { children } = props;

  const [loggedIn, setLoggedIn] = useState();

  // const themeToggle = () => {
  //   localStorage.setItem('toDoListTheme', JSON.stringify(theme === 'light' ? 'dark' : 'light'));
  //   return theme === 'light' ? setTheme('dark') : setTheme('light');
  // };

  useEffect(() => {
    if (loggedIn) {
      const userInfo = loggedIn.accessToken.claims;
      const userObj = {
        sub: userInfo.sub,
        id: userInfo.uid,
      };

      fetch(`http://localhost:8001/api/users/${userObj.id}`, {
        headers: {
          Authorization: `Bearer ${loggedIn.accessToken}`,
        },
      }).then(response => {
        console.log('Backend response: ', response);
      });
      console.log(loggedIn, userInfo, userObj, 'in loggedIn.js');
    }
    // if (authState.isAuthenticated) {
    //   const accessToken = oktaAuth.getAccessToken();
    // fetch(config.resourceServer.messagesUrl, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // })
    //     .then(response => {
    //       if (!response.ok) {
    //         return Promise.reject();
    //       }
    //       return response.json();
    //     })
    //     .then(data => {
    //       let index = 0;
    //       const formattedMessages = data.messages.map(message => {
    //         const date = new Date(message.date);
    //         const day = date.toLocaleDateString();
    //         const time = date.toLocaleTimeString();
    //         index += 1;
    //         return {
    //           date: `${day} ${time}`,
    //           text: message.text,
    //           id: `message-${index}`,
    //         };
    //       });
    //       setMessages(formattedMessages);
    //       setMessageFetchFailed(false);
    //     })
    //     .catch(err => {
    //       setMessageFetchFailed(true);
    //       /* eslint-disable no-console */
    //       console.error(err);
    //     });
    // }
  }, [loggedIn]);

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

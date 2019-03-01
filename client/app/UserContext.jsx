import React, { createContext, useState } from 'react';

const UserContext = createContext({ userId: '', token: '', setUserInfo: () => {} });

export default UserContext;
export const UserContextProvider = ({ children }) => {
  const setUserInfo = ({ userId, token, userName }) => {
    changeState({
      setUserInfo, userId, token, userName,
    });
  };
  const [state, changeState] = useState({
    userId: '', token: '', userName: '', setUserInfo,
  });

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  );
};

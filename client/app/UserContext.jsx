import React, { createContext, useState } from 'react';

const UserContext = createContext({ userId: '', token: '', setUserInfo: () => {} });

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const setUserInfo = ({ userId, token }) => {
    changeState({ ...state, userId, token });
  };
  const [state, changeState] = useState({ userId: '', token: '', setUserInfo });

  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  );
};

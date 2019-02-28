import React, { useContext } from 'react';
import Profile from './Profile';
import UserContext from '../../UserContext';

export default (params) => {
  const { userId, token } = useContext(UserContext);
  return <Profile isMyProfile user={{ userId, token }} {...params} />;
};

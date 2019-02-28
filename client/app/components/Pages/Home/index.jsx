import React, { useContext } from 'react';
import UserContext from '../../../UserContext';

import LoginRegister from './LoginRegister';
import UserPage from './UserHomePage/UserPage';

const Home = () => {
  const { userId } = useContext(UserContext);
  const ActiveComponent = userId ? <UserPage /> : <LoginRegister />;
  return ActiveComponent;
};

export default Home;

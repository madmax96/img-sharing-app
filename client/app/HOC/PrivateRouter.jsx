import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../UserContext';

function withPrivateRoute(R) {
  return ({ component: C, ...passThruProps }) => {
    const { userId } = useContext(UserContext);
    return <R {...passThruProps} component={userId ? C : () => <Redirect to="/" />} />;
  };
}

export default withPrivateRoute;

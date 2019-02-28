import 'babel-polyfill';
import React, {
  useContext, useEffect, useState,
} from 'react';
import {
  Router, Switch, Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import Config from './config';
import UserContext, { UserContextProvider } from './UserContext';
import './styles/style.scss';
import withErrorBoundary from './HOC/ErrorBoundary';
import withPrivateRoute from './HOC/PrivateRouter';
import Home from './components/Pages/Home';
import Loader from './components/UI/Loader';
import store from './store';
import { addUserInfo } from './actions/actionCreators';
import Profile from './components/Pages/Profile';
import MyProfile from './components/Pages/MyProfile';

import 'bootstrap';

const PrivateRoute = withPrivateRoute(Route);
const history = createBrowserHistory();
const { API_URL } = Config;

const r = (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={withErrorBoundary(Home)} />
        <PrivateRoute path="/profile" component={withErrorBoundary(MyProfile)} />
        <PrivateRoute path="/users/:userName" key="user profile" component={withErrorBoundary(Profile)} />
      </Switch>
    </Router>
  </Provider>
);
const AppLoader = (
  <div className="row vh-100 align-items-center justify-content-center">
    <Loader />
  </div>
);
const App = () => {
  const { setUserInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_URL}/users/me`, { headers: { 'x-auth': token } })
        .then((response) => {
          const user = response.data;
          setUserInfo({ userId: user._id, token });
          store.dispatch(addUserInfo(user));
          setIsLoading(false);
        }).catch((e) => {
          localStorage.setItem('token', '');
          console.log(e);
          setUserInfo({ userId: '', token: '' });
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);
  return isLoading ? AppLoader : r;
};

render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>, document.getElementById('root'),
);

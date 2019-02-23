// import 'babel-polyfill';
import React, { useState } from 'react';
import {
  Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { userLogin } from './actions/actionCreators';
import Config from './config';
import './styles/style.scss';

import Home from './components/Pages/Home';
import Loader from './components/UI/Loader';
import store from './store';
import Profile from './components/Pages/Home/UserHomePage/Profile';
import 'bootstrap';

const history = createBrowserHistory();
const { API_URL } = Config;

const r = (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" key="this user profile" component={Profile} />
        <Route path="/users/:userName" key="user profile" component={Profile} />
      </Switch>
    </Router>
  </Provider>
);
const AppLoader = (
  <div className="row vh-100 align-items-center justify-content-center">
    <Loader />
  </div>
);

render(AppLoader, document.getElementById('root'));

const token = localStorage.getItem('token');

if (token) {
  axios.get(`${API_URL}/users/me`, { headers: { 'x-auth': token } })
    .then((response) => {
      const user = response.data;
      user.token = token;
      store.dispatch(userLogin(user));
      render(r, document.getElementById('root'));
    }).catch((e) => {
      localStorage.setItem('token', '');
      console.log(e);
      render(r, document.getElementById('root'));
      history.push('/');
    });
} else {
  render(r, document.getElementById('root'));
  history.push('/');
}

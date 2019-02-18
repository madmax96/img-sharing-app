// import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './styles/style.scss';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import FullPageContainer from './components/UI/FullPageContainer';
import Home from './components/Pages/Home';
import store from './store';
import Profile from './components/Pages/Profile';
import 'bootstrap';

const r = (
  <Provider store={store}>
    <Router>
      <FullPageContainer className="container-fluid">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/profile" />
        </Switch>
      </FullPageContainer>
    </Router>
  </Provider>
);

render(r, document.getElementById('root'));

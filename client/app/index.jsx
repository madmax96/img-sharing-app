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

// const Playground = (props) => {
//   const [userImage, setUserImage] = useState();

//   function handleChange(e) {
//     e.preventDefault();
//     const image = e.target.files[0];
//     setUserImage(window.URL.createObjectURL(image));
//     const bodyFormData = new FormData();
//     bodyFormData.append('image', image);
//     axios({
//       method: 'post',
//       url: 'http://localhost:8888/',
//       data: bodyFormData,
//       config: { headers: { 'Content-Type': 'multipart/form-data' } },
//     })
//       .then((response) => {
//         // handle success
//         console.log(response);
//       })
//       .catch((response) => {
//         // handle error
//         console.log(response);
//       });
//   }
//   return (
//     <div>
//       <form>
//         <input type="file" accept="image/*" onChange={handleChange} />
//           Insert Image
//         <button className="btn btn-primary" type="submit">Upload</button>
//         <img src={userImage} />
//       </form>
//     </div>
//   );
// };

const r = (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/users/:userName" component={Profile} />

      </Switch>
    </Router>
  </Provider>
);

render(r, document.getElementById('root'));

const token = localStorage.getItem('token');

if (token) {
  store.dispatch(userLogin({ authInProgress: true }));
  axios.get(`${API_URL}/users/me`, { headers: { 'x-auth': token } })
    .then((response) => {
      const user = response.data;
      user.token = token;
      store.dispatch(userLogin(user));
    }).catch((e) => {
      localStorage.setItem('token', '');
      console.log(e);
      store.dispatch(userLogin({ authInProgress: false }));
      history.push('/');
    });
} else {
  history.push('/');
}

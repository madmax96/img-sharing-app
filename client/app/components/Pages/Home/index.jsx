import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import LoginRegister from './LoginRegister';
import UserPage from './UserPage';
import Loader from '../../UI/Loader';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ component: 'login-register' });
    }
  }

  render() {
    const { component } = this.state;
    let ActiveComponent;
    switch (component) {
      case 'login-register':
        ActiveComponent = <LoginRegister />;
        break;
      case 'user-page':
        ActiveComponent = <UserPage />;
        break;
      default:
        ActiveComponent = <Loader />;
    }

    return ActiveComponent;
  }
}

Home.propTypes = {
};
export default Home;

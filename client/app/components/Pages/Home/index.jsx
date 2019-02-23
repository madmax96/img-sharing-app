import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginRegister from './LoginRegister';
import UserPage from './UserHomePage/UserPage';

const Home = ({ user }) => {
  const ActiveComponent = user.token ? <UserPage /> : <LoginRegister />;
  return ActiveComponent;
};
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);


Home.propTypes = {
};

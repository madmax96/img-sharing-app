import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NavbarUI from '../../../UI/Navbar';
import Logo from '../../../UI/Logo';
import { userLogout } from '../../../../actions/actionCreators';

const Navbar = ({ logout }) => (
  <NavbarUI>
    <NavbarUI.Logo>
      <Logo />
    </NavbarUI.Logo>
    <NavbarUI.ThirdSection>
      <NavLink to="/profile" className="btn btn-primary mr-2">Profile</NavLink>
      <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
    </NavbarUI.ThirdSection>
  </NavbarUI>
);
const mapDispatchToProps = dispatch => ({
  logout: () => {
    localStorage.setItem('token', ' ');
    dispatch(userLogout());
  },
});
export default connect(null, mapDispatchToProps)(Navbar);

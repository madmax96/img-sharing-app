import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NavbarUI from '../../../UI/Navbar';
import Logo from '../../../UI/Logo';
import { userLogout } from '../../../../actions/actionCreators';
import StyledText from '../../../UI/StyledText';

const Navbar = ({ logout }) => (
  <NavbarUI>
    <NavbarUI.Logo>
      <div className="d-flex align-items-center">
        <NavLink to="/">
          <StyledText style={{ 'font-size': '1.4rem' }}>InstaFon</StyledText>
        </NavLink>
      </div>
    </NavbarUI.Logo>
    <NavbarUI.ThirdSection>
      <NavLink to="/profile" className="btn btn-primary mr-2">Profile</NavLink>
      <NavLink to="/" className="btn btn-danger" onClick={logout}>Logout</NavLink>
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

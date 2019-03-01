import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import NavbarUI from '../UI/Navbar';
import StyledText from '../UI/StyledText';
import UserContext from '../../UserContext';

const Navbar = () => {
  const { setUserInfo } = useContext(UserContext);
  function logout() {
    localStorage.setItem('token', '');
    setUserInfo({ userId: '', token: '' });
  }
  return (
    <NavbarUI>
      <NavbarUI.Logo>
        <div className="d-flex align-items-center">
          <NavLink to="/">
            <StyledText style={{ fontSize: '1.4rem' }}>InstaFon</StyledText>
          </NavLink>
        </div>
      </NavbarUI.Logo>
      <NavbarUI.ThirdSection>
        <NavLink to="/profile" className="btn btn-primary mr-2">Profile</NavLink>
        <Button color="primary">Instagram</Button>
        <NavLink to="/" className="btn btn-danger" onClick={logout}>Logout</NavLink>
      </NavbarUI.ThirdSection>
    </NavbarUI>
  );
};

export default Navbar;

import React from 'react';
import TwoTabs from '../../UI/TwoTabs';
import Logo from '../../UI/Logo';
import StyledText from '../../UI/StyledText';
import LoginForm from '../../Common/Forms/LoginForm';
import RegisterForm from '../../Common/Forms/RegisterForm';
import FullPageContainer from '../../UI/FullPageContainer';

class LoginRegister extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {

  }

  render() {
    const left = {
      title: 'Login',
      content: (
        <div className="h-100 row align-items-center justify-content-center">
          <div className="col-10 text-center">
            <LoginForm />
          </div>
        </div>),
    };
    const right = {
      title: 'Register',
      content: (
        <div className="h-100 row align-items-center justify-content-center">
          <div className="col-10 text-center">
            <RegisterForm />
          </div>
        </div>
      ),
    };

    return (
      <FullPageContainer>
        <div className="row h-100 align-items-center justify-content-center position-relative">
          <div className="row col-12 col-md-auto align-items-center justify-content-center">
            <Logo />
            <StyledText className="col-auto text-center">InstaFon</StyledText>
          </div>
          <div className="w-100" />
          <div className=" col-12 pb-3 col-md-6 h-75">
            <TwoTabs left={left} right={right} active={1} />
          </div>
        </div>
      </FullPageContainer>
    );
  }
}


export default LoginRegister;

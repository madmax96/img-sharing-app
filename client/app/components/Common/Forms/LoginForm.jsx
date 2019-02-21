import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from '../../UI/Loader';
import { isEmailValid, isPasswordValid } from '../../../utils/validation';
import Config from '../../../config';
import { userLogin } from '../../../actions/actionCreators';

const { API_URL } = Config;
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      password: '',
      errors: {
        userEmail: null,
        password: null,
      },
      loader: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  handleLogin(e) {
    this.setState({ loader: true });
    const { userEmail: email, password } = this.state;
    const { login } = this.props;
    e.preventDefault();
    axios.post(`${API_URL}/users/login`, {
      email, password,
    }).then((response) => {
      const user = response.data;
      console.log(response.headers);
      user.token = response.headers['x-auth'];
      console.log(user.token);
      localStorage.setItem('token', user.token);
      login(user);
    })
      .catch(err => console.log(err));
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  checkEmail() {
    const { userEmail } = this.state;

    this.setState(prevState => ({
      errors:
        {
          ...prevState.errors,
          userEmail: !isEmailValid(userEmail),
        },
    }));
  }

  checkPassword() {
    const { password } = this.state;

    this.setState(prevState => ({
      errors:
        {
          ...prevState.errors,
          password: !isPasswordValid(password),
        },
    }));
  }

  render() {
    const { errors, loader } = this.state;
    const canSubmit = Object.keys(errors).every(prop => errors[prop] === false);
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            name="userEmail"
            className={`form-control ${errors.userEmail !== null ? (errors.userEmail ? 'is-invalid' : 'is-valid') : ''}`}
            onChange={this.handleInputChange}
            placeholder="Enter email"
            onBlur={this.checkEmail}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password !== null ? (errors.password ? 'is-invalid' : 'is-valid') : ''}`}
            onChange={this.handleInputChange}
            placeholder="Password"
            onBlur={this.checkPassword}
          />
        </div>
        {loader ? <Loader />
          : <button type="submit" className="btn btn-primary" onClick={this.handleLogin} disabled={!canSubmit}>Login</button>
        }
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(userLogin(user)),
});

export default connect(null, mapDispatchToProps)(LoginForm);

import React from 'react';
import axios from 'axios';
import { isEmailValid, isPasswordValid } from '../../../utils/validation';
import Config from '../../../config';

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
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  handleLogin(e) {
    const { userEmail: email, password } = this.state;
    e.preventDefault();
    axios.post(`${API_URL}/users/login`, {
      email, password,
    }).then(() => {
      alert('success');
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
    const { errors } = this.state;
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

        <button type="submit" className="btn btn-primary" onClick={this.handleLogin} disabled={!canSubmit}>Login</button>
      </form>
    );
  }
}


export default LoginForm;

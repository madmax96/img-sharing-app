import React from 'react';
import axios from 'axios';
import { isEmailValid, isPasswordValid, isFullNameValid } from '../../../utils/validation';
import Config from '../../../config';

const { API_URL } = Config;
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      password: '',
      fullName: '',
      userName: '',
      errors: {
        userEmail: null,
        password: null,
        fullName: null,
        userName: null,
      },
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkUserName = this.checkUserName.bind(this);
    this.checkFullName = this.checkFullName.bind(this);
  }

  handleRegister(e) {
    const {
      userEmail: email, password, fullName, userName,
    } = this.state;
    e.preventDefault();
    axios.post(`${API_URL}/users`, {
      email, password, fullName, userName,
    }).then(() => alert('success'))
      .catch(err => console.log(err));
  }

  checkEmail() {
    const { userEmail } = this.state;

    const _isEmailValid = isEmailValid(userEmail);

    if (_isEmailValid) {
      axios.get(`${API_URL}/users/checkEmail/${userEmail}`)
        .then(() => {
          this.setState(prevState => ({
            errors:
            {
              ...prevState.errors,
              userEmail: false,
            },
          }));
        })
        .catch(() => {
          this.setState(prevState => ({
            errors:
            {
              ...prevState.errors,
              userEmail: true,
            },
          }));
        });
    } else {
      this.setState(prevState => ({
        errors:
        {
          ...prevState.errors,
          userEmail: true,
        },
      }));
    }
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

  checkFullName() {
    const { fullName } = this.state;

    this.setState(prevState => ({
      errors:
        {
          ...prevState.errors,
          fullName: !isFullNameValid(fullName),
        },
    }));
  }

  checkUserName() {
    const { userName } = this.state;
    if (!userName || userName.length < 3) {
      return this.setState(prevState => ({
        errors:
          {
            ...prevState.errors,
            userName: true,
          },
      }));
    }
    axios.get(`${API_URL}/users/checkUserName/${userName}`)
      .then(() => {
        this.setState(prevState => ({
          errors:
          {
            ...prevState.errors,
            userName: false,
          },
        }));
      })
      .catch(() => {
        this.setState(prevState => ({
          errors:
          {
            ...prevState.errors,
            userName: true,
          },
        }));
      });
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
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
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            className={`form-control ${errors.fullName !== null ? (errors.fullName ? 'is-invalid' : 'is-valid') : ''}`}
            onChange={this.handleInputChange}
            placeholder="Full Name"
            onBlur={this.checkFullName}

          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="userName"
            className={`form-control ${errors.userName !== null ? (errors.userName ? 'is-invalid' : 'is-valid') : ''}`}
            onChange={this.handleInputChange}
            placeholder="Username"
            onBlur={this.checkUserName}

          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.handleRegister} disabled={!canSubmit}>Register</button>
      </form>
    );
  }
}


export default RegisterForm;

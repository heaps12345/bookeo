import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import { Redirect } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  loginUser = data => {
    this.props.loginUser(data);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(newUser);
  };

  render() {
    const { errors, auth } = this.props;

    if (this.props.auth.isAuth) {
      return <Redirect to="/rentals" />;
    }
    return (
      <section id="login">
        <div className="reg-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              {auth.registerSuccess && (
                <div className="alert alert-success">
                  <p style={{ marginTop: '15px' }}>You have been succeesfully registered, please login now</p>
                </div>
              )}
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  label="Email"
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  errors={errors}
                />
                <TextFieldGroup
                  label="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.passwrd}
                  errors={errors}
                />

                <button value="submit" className="btn-main btn">
                  submit
                </button>
              </form>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                <img src={process.env.PUBLIC_URL + '/img/lounge2.jpg'} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

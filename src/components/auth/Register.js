import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';

import axios from 'axios';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    redirect: false,
    passwordCheck: false,
    gender: '',
    img: ''
  };

  redirect = () => {
    this.setState({ redirect: true });
  };

  registerUser = data => {
    this.props.registerUser(data);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fetchImg = async () => {
    let img = '';
    if (this.state.gender === 'male') {
      img = await axios.get('https://randomuser.me/api/?gender=male', { withCredentials: false });
    } else {
      img = await axios.get('https://randomuser.me/api/?gender=female', { withCredentials: false });
    }
    this.setState({
      img: img.data.results[0].picture.large
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    await this.fetchImg();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      img: this.state.img,
      gender: this.state.gender,
      password: this.state.password,
      password2: this.state.password2
    };
    if (this.state.password !== this.state.password2) {
      this.setState({
        passwordCheck: true
      });
    } else {
      // console.log(this.state);
      this.props.registerUser(newUser, this.props.history);
      // this.setState({ passwordCheck: false, redirect: true });
    }
  };

  render() {
    const selectOptions = [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }];

    const { errors } = this.props;

    return (
      <section id="register">
        <div className="reg-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Register</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  label="Username"
                  type="text"
                  name="username"
                  onChange={this.onChange}
                  value={this.state.username}
                  errors={errors}
                />
                <TextFieldGroup
                  label="Email"
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  errors={errors}
                />

                <SelectListGroup
                  label="Gender"
                  name="gender"
                  onChange={this.onChange}
                  value={this.state.gender}
                  options={selectOptions}
                  errors={errors}
                />

                <TextFieldGroup
                  label="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  errors={errors}
                />
                <TextFieldGroup
                  label="Confirm password"
                  type="password"
                  name="password2"
                  onChange={this.onChange}
                  value={this.state.password2}
                />

                {this.state.passwordCheck && <p className="alert alert-danger">Passwords must match</p>}

                <button value="submit" className="btn-main btn">
                  Submit
                </button>
              </form>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">As our member you have access to most awesome places in the world.</h2>
                <img src={process.env.PUBLIC_URL + '/img/trees2.jpg'} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);

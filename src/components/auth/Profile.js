import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions';
import ImageUpload from '../common/form/ImageUpload';

class Profile extends Component {
  state = {
    profileImg: ''
  };
  componentDidMount() {}

  render() {
    const { auth } = this.props;
    return (
      <div class="container bootstrap snippet">
        <div class="row">
          <div class="col-sm-10">
            <h1>{auth && auth.username}</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <div class="text-center">
              <img
                src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="avatar img-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>
              <ImageUpload />
            </div>
          </div>

          <div class="col-sm-9">
            <div class="tab-pane" id="messages">
              <form class="form">
                <div class="form-group">
                  <div class="col-xs-6">
                    <label for="first_name">
                      <h4>Username</h4>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="first_name"
                      id="first_name"
                      placeholder="first name"
                      title="enter your first name if any."
                    />
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-xs-6">
                    <label for="email">
                      <h4>Email</h4>
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      id="email"
                      placeholder="you@email.com"
                      title="enter your email."
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-xs-6">
                    <label for="email">
                      <h4>Location</h4>
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="location"
                      placeholder="somewhere"
                      title="enter a location"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-xs-6">
                    <label for="password">
                      <h4>Password</h4>
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      id="password"
                      placeholder="password"
                      title="enter your password."
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-xs-6">
                    <label for="password2">
                      <h4>Verify</h4>
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      name="password2"
                      id="password2"
                      placeholder="password2"
                      title="enter your password2."
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-xs-12">
                    <br />
                    <button class="btn btn-lg btn-success" type="submit">
                      <i class="glyphicon glyphicon-ok-sign" /> Save
                    </button>
                    <button class="btn btn-lg" type="reset">
                      <i class="glyphicon glyphicon-repeat" /> Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(Profile);

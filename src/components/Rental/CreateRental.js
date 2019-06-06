import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import ImageUpload from '../common/ImageUpload';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createRental, uploadImage } from '../../actions';

class CreateRental extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      city: '',
      street: '',
      bedrooms: '',
      dailyRate: '',
      description: '',
      category: ''
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newRental = {
      title: this.state.title,
      city: this.state.city,
      street: this.state.street,
      bedrooms: this.state.bedrooms,
      dailyRate: this.state.dailyRate,
      description: this.state.description,
      category: this.state.category,
      image: this.props.img,
      userId: this.props.auth.user.id,
      username: this.props.auth.user.username,
      userImg: this.props.auth.user.img
    };
    // console.log(newRental)
    this.props.createRental(newRental);
  };

  render() {
    const { errors } = this.props;

    if (this.state.redirect) {
      return <Redirect to="/rentals" />;
    }
    const selectOptions = [
      { value: 'apartment', label: 'Apartment' },
      { value: 'house', label: 'House' },
      { value: 'condo', label: 'Condo' }
    ];

    return (
      <section id="newRental">
        <div className="reg-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Create Rental</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  label="Title"
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                  errors={errors}
                />

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="6"
                    onChange={this.onChange}
                    value={this.state.description}
                  />
                  {errors &&
                    errors.length > 0 &&
                    errors.map((error, i) => {
                      return (
                        error.param === 'description' && (
                          <p key={i} className="alert alert-danger">
                            {error.msg}
                          </p>
                        )
                      );
                    })}
                </div>
                <TextFieldGroup
                  label="City"
                  name="city"
                  onChange={this.onChange}
                  value={this.state.city}
                  errors={errors}
                />
                <TextFieldGroup
                  label="Street"
                  name="street"
                  onChange={this.onChange}
                  value={this.state.street}
                  errors={errors}
                />
                <SelectListGroup
                  label="Category"
                  name="category"
                  onChange={this.onChange}
                  value={this.state.category}
                  options={selectOptions}
                  errors={errors}
                />

                <div className="form-group">
                  <ImageUpload errors={errors} />

                  
                </div>
                <TextFieldGroup
                  label="Bedrooms"
                  name="bedrooms"
                  onChange={this.onChange}
                  value={this.state.bedrooms}
                  errors={errors}
                />
                <TextFieldGroup
                  label="Daily rate"
                  name="dailyRate"
                  onChange={this.onChange}
                  value={this.state.dailyRate}
                  errors={errors}
                />

                <button value="submit" className="btn-main btn">
                  Create Rental
                </button>
              </form>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                <img src={process.env.PUBLIC_URL + '/img/kitchen.jpg'} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  img: state.img.data
});

export default withRouter(
  connect(
    mapStateToProps,
    { createRental, uploadImage }
  )(CreateRental)
);

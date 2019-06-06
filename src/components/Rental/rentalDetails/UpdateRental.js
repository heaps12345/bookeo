import React, { Component } from 'react';
import RentalAssets from './RentalAmenities';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import { updateRental } from '../../../actions';

class UpdateRental extends Component {
  EditableTitle = React.createRef();
  EditableCity = React.createRef();
  EditableDesc = React.createRef();
  EditableStreet = React.createRef();
  state = {
    city: this.props.rental.city,
    title: this.props.rental.title,
    desc: this.props.rental.description,
    street: this.props.rental.street
  };

  handleChange = evt => {
    this.setState({
      [evt.currentTarget.id]: evt.target.value
    });
  };

  onBlur = evt => {
    this.props.updateRental(evt, this.props.rental.rentalId);
  };

  render() {
    const { rental } = this.props;
    return (
      <div className="rental">
        <h2 className={`rental-type ${rental.category}`}>{rental.category}</h2>
        <div className="rental-owner">
          <img src={rental.userImg} alt="owner" />
          <span className="username">{rental.username && rental.username}</span>
        </div>

        {/*   <h1 className="rental-title">{rental.title}</h1>*/}
        <ContentEditable
          id="title"
          innerRef={this.EditableTitle}
          html={this.state.title} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onBlur={this.onBlur}
          onChange={this.handleChange} // handle innerHTML change
          tagName="article" // Use a custom HTML tag (uses a div by default)
          className="rental-title"
        />
        <ContentEditable
          id="city"
          innerRef={this.EditableCity}
          html={this.state.city} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onBlur={this.onBlur}
          onChange={this.handleChange} // handle innerHTML change
          tagName="article" // Use a custom HTML tag (uses a div by default)
          className="rental-city"
        />
        <ContentEditable
          id="street"
          innerRef={this.EditableStreet}
          html={this.state.street} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onBlur={this.onBlur}
          onChange={this.handleChange} // handle innerHTML change
          tagName="article" // Use a custom HTML tag (uses a div by default)
          className="rental-city"
        />

        <div className="rental-room-info">
          <span>
            <i className="fa fa-building" />
            {rental.bedrooms} bedrooms
          </span>
          <span>
            <i className="fa fa-user" /> {rental.bedrooms + 4} guests
          </span>
          <span>
            <i className="fa fa-bed" /> {rental.bedrooms + 2} beds
          </span>
        </div>
        <ContentEditable
          id="desc"
          innerRef={this.EditableDesc}
          html={this.state.desc} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onBlur={this.onBlur}
          onChange={this.handleChange} // handle innerHTML change
          tagName="article" // Use a custom HTML tag (uses a div by default)
          className="rental-description"
        />
        <hr />
        <RentalAssets />
      </div>
    );
  }
}

export default connect(
  null,
  { updateRental }
)(UpdateRental);

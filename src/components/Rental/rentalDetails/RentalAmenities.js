import React from 'react';

const RentalAmenities = () => {
  return (
    <div className="rental-amenities">
      <h3 className="title">Amenities</h3>
      <div className="row">
        <div className="col-md-6">
          <span>
            <i className="fas fa-utensils" /> Kitchen
          </span>
          <span>
            <i className="fas fa-wifi" /> Wifi
          </span>
          <span>
            <i className="fas fa-mug-hot" /> Coffee maker
          </span>
        </div>
        <div className="col-md-6">
          <span>
            <i className="fab fa-product-hunt" /> Free parking on premises
          </span>
          <span>
            <i className="fas fa-hot-tub" /> Hot tub
          </span>
          <span>
            <i className="fas fa-tv" /> HD TV
          </span>
        </div>
      </div>
    </div>
  );
};

export default RentalAmenities;

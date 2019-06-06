import React from 'react';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

const RentalCard = ({ colNum, rental }) => {
  return (
    <div className={colNum}>
      <Link to={`/rental/${rental.rentalId}`} className="rental-detail-link">
        <div className="card rental-card">
          <img className="card-img-top" src={rental.image} alt="" />
          <div className="card-block">
            <div style={{ display: 'flex' }}>
              <h4 className="card-title">
                ${rental.dailyRate} {rental.title} <br />
              </h4>
            </div>
            <h6 className={`card-subtitle card-text ${rental.category}`}>
              <span style={{ textTransform: 'capitalize' }}>{rental.category}</span> &#183; {rental.bedrooms}{' '}
              bedroom&#40;s&#41;
            </h6>
            <span className="rating">
              <StarRatingComponent
                className="stars"
                name="rate1"
                starCount={5}
                value={parseFloat(rental.avgRating)}
                starColor={'#008489'}
                emptyStarColor={'#cbd3e3'}
              />
              {rental.reviewCount} Reviews
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RentalCard;

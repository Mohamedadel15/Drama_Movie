import React from 'react';
import StarRatings from 'react-star-ratings';

const StarRating = ({ rating,Desplay }) => {
  return (
    <div className={`mb-1 d-inline ${Desplay}`}>
      <StarRatings
        rating={rating / 2}
        starRatedColor="rgb(35, 145, 255)" // Color of filled stars
        starEmptyColor="gray" // Color of empty stars
        numberOfStars={5} // Total number of stars
        name="rating" // Name of the rating input
        starDimension="20px"
        starSpacing="2px"
    

      />
    </div>
  );
};

export default StarRating;



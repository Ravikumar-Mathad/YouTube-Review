import React, { useState } from "react";
import "../styles/ratingPop.css";

const RatingPop = (props) => {
  const [rating, setrating] = useState(null);
  const [ratingCounts, setratingCounts] = useState([1820, 930, 255, 101, 32]);

  const ratingChange = (event) => {
    const userRating = event.target.value;
    const updatedRatingCounts = [...ratingCounts];
    if (rating) {
      updatedRatingCounts[5 - rating] -= 1;
    }
    updatedRatingCounts[5 - userRating] += 1;
    setratingCounts(updatedRatingCounts);
    setrating(userRating);
    setTimeout(() => props.ClosePop(), 1500);
    setTimeout(() => setrating(0), 2500)
  };

  let sumOfRatings = 0;
  ratingCounts.forEach((count) => {
    sumOfRatings += count;
  });

  return (
    <div
      className="ratingSystem"
      style={
        props.show
          ? { transform: "translate(0px, 0px) scale(0.95)", opacity: "1" }
          : { transform: "translate(0px, -1000px)", opacity: "0" }
      }
    >
      <p className="SlangofRating">
        Your Vibe,<span>Your Score!</span>
      </p>
      <form className="rating">
        <input
          type="radio"
          id="star5"
          name="rating"
          value="5"
          onChange={ratingChange}
          checked={(rating > 0 && rating == "5")}
        />
        <label htmlFor="star5"></label>

        <input
          type="radio"
          id="star4"
          name="rating"
          value="4"
          onChange={ratingChange}
          checked={(rating > 0 && rating == "4")}
        />
        <label htmlFor="star4"></label>

        <input
          type="radio"
          id="star3"
          name="rating"
          value="3"
          onChange={ratingChange}
          checked={(rating > 0 && rating == "3")}
        />
        <label htmlFor="star3"></label>

        <input
          type="radio"
          id="star2"
          name="rating"
          value="2"
          onChange={ratingChange}
          checked={(rating > 0 && rating == "2")}
        />
        <label htmlFor="star2"></label>

        <input
          type="radio"
          id="star1"
          name="rating"
          value="1"
          onChange={ratingChange}
          checked={(rating > 0 && rating == "1")}
        />
        <label htmlFor="star1"></label>
      </form>
      <p className="ratingNamber">
        {rating ?? 0}
        <span>/5</span>
      </p>
      <p className="descriptionBottom">YOUTUBE RATING</p>
      <p className="totalRatings">
        {sumOfRatings.toLocaleString()} <span>ratings</span>
      </p>
      <div className="ratingDistribution">
        <div className="ratingNumbers">
          <p>5</p>
          <p>4</p>
          <p>3</p>
          <p>2</p>
          <p>1</p>
        </div>
        <div className="ratingStars">
          <label></label>
          <label></label>
          <label></label>
          <label></label>
          <label></label>
        </div>
        <div className="ratingLenght">
          {ratingCounts.map((count, index) => (
            <div key={index}>
              <div
                style={{
                  width: `${(count / sumOfRatings) * 100}%`,
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className="ratingNumbers">
          {ratingCounts.map((count, index) => (
            <p key={index}>{count.toLocaleString()}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingPop;

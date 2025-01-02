import React from "react";
import "../styles/ratingPreview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

const RatingPreview = () => {

  return (
    <div className="ratingPreviewBox">
      <p className="Slang">Your Vibe,<br />Your Score!</p>
      <div className="rightPartPreview">
        <div className="StarCollection">
          <FontAwesomeIcon
            icon={faStar}
            size="xl"
            style={{ color: "#000000" }}
          />
          <FontAwesomeIcon
            icon={faStar}
            size="xl"
            style={{ color: "#000000" }}
          />
          <FontAwesomeIcon
            icon={faStar}
            size="xl"
            style={{ color: "#000000" }}
          />
          <FontAwesomeIcon
            icon={faStar}
            size="xl"
            style={{ color: "#000000" }}
          />
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            size="xl"
            style={{ color: "#000000" }}
          />
        </div>
        <p className="rNumber">
          4.8<span>/5</span>
        </p>
        <p className="descriptionBottom">YOUTUBE RATING</p>
      </div>
    </div>
  );
};

export default RatingPreview;

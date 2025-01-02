import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/exploreBtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

const ExploreBtn = () => {
  return (
    <NavLink className="removeLinkStyle" to="/StandUp">
      <button className="exploreBtn">
        <FontAwesomeIcon
          icon={faCompass}
          size="lg"
          style={{ color: "#ffffff" }}
        />
        Explore
      </button>
    </NavLink>
  );
};

export default ExploreBtn;

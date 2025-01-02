import React, { useRef, useState } from "react";
import PopularClipSeries from "./PopularClipSeries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/PopularClipPage.css";

const PopularClipPage = () => {
  const contentScrollref = useRef();
  const [updateData, setupdateData] = useState(1)

  const ScrollRight = () => {
    contentScrollref.current.scrollBy(window.screen.width / 2, 0);
    setupdateData(updateData + 1)
  };

  const ScrollLeft = () => {
    contentScrollref.current.scrollBy(-window.screen.width / 2, 0);
  };

  return (
    <div className="popularPage">
      <h3 className="popStatement">Popular highlights</h3>
      <p className="popDisc">
        Discover our top-rated videos, each surpassing 5 million views! Join
        the community celebrating these standout clips!
      </p>
      <PopularClipSeries updateData={updateData} refKey={contentScrollref} />
      <div className="NavigateBtns">
        <button onClick={ScrollLeft} className="nextBtn">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            size="xl"
            style={{ color: "#ffffff" }}
          />
        </button>
        <button onClick={ScrollRight} className="nextBtn">
          <FontAwesomeIcon
            icon={faArrowRightLong}
            size="xl"
            style={{ color: "#ffffff" }}
          />
        </button>
      </div>
    </div>
  );
};

export default PopularClipPage;

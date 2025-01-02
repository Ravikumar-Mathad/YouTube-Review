import React from "react";
import "../styles/hightlightPage.css";

const MissionPage = () => {
  return (
    <div className="hightlightPage">
      <video
        src="src\assets\Background video.mp4"
        autoPlay
        loop
        muted
        className="backgroundVideo"
      />
      <h2 className="SecondHeader">
        <p className="webStatement">
          This platform is designed for you to explore videos, share your
          ratings, and help others find
          <span className="hgtColor">quality content.</span>
        </p>
        <p className="missionStatement">
          Our mission:
          <span className="hgtColor">
            Is to transform content evaluation by creating a platform where
            genuine feedback leads to a more enriching and rewarding viewing
            experience.
          </span>
        </p>
      </h2>
    </div>
  );
};

export default MissionPage;

import React, { useState } from "react";
import "../styles/profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import BookmarkList from "./BookmarkList";
import profileAlter from '../assets/profile alter image.png'
import userProfile from '../assets/profile Pic.webp'
import feedbackBackground from '../assets/BioBackGround.mp4'

const Profile = (props) => {
  const [messegeCard, setmessegeCard] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [feedbacks, setfeedbacks] = useState([]);

  const handleCard = () => {
    setmessegeCard(!messegeCard);
  };

  const handleInputChange = (event) => {
    setinputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    setfeedbacks([...feedbacks, inputValue]);
    setinputValue("");
  };

  return (
    <div className="profilePage">
      {messegeCard ? (
        <div className="dashboardError">
          <img
            className="workInProgress"
            src={profileAlter}
            alt="work in progress"
          />
          <p className="errorHeadLine">Work in Progress!</p>
          <p className="errorDiscription">
            These features are currently under development. Options like Edit
            Profile, My Ratings, Favorites, and Settings are not functional yet
            because backend support has not been implemented.
            <br />
            I'm actively working on building these features and will enable them
            in future updates. Thank you for your patience!
          </p>
          <button onClick={handleCard} className="userSureBtn">Ok, got it!!</button>
        </div>
      ) : (
        <div className="dashboard">
          <div className="profilePic">
            <img
              className="profileImg"
              src={userProfile}
              alt="profilepic"
            />
          </div>
          <p className="userName">{props.FinaluserName}</p>
          <div className="dashline"></div>
          <p className="dashDict">Your Dashboard:</p>
          <button onClick={handleCard} className="dashBoardBtn">
            Edit Profile
          </button>
          <button onClick={handleCard} className="dashBoardBtn">
            My Ratings
          </button>
          <button onClick={handleCard} className="dashBoardBtn">
            Favorites
          </button>
          <button onClick={handleCard} className="dashBoardBtn">
            Settings
          </button>
        </div>
      )}

      <div className="combine">
        <div className="feedback">
          <video
            loop
            muted
            autoPlay
            className="feedbackbackgroundVideo"
            src={feedbackBackground}
          />
          <p className="feedbackStatement">
            Tell us what you think about our concept and site!
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="feedbackText"
              placeholder="Your Feedback"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit" className="submitbtn">
              Submit
            </button>
          </form>
        </div>
        <div className="watchlistSection">
          <p className="watchListDivName">
            <FontAwesomeIcon
              icon={faBookmark}
              size="sm"
              style={{ color: "#000000" }}
            />
            WatchList
          </p>
          <BookmarkList videoIdList={props.videoIdsList} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

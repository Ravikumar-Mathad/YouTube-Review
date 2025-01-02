import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../styles/scrollContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faPlus,
  faClockRotateLeft,
  faCircleCheck,
  faTrophy,
  faCheck,
  faStar as fasStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const LearningEssentials = (props) => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const PLAYLIST_ID = "PL-lPJw3tb8iAZCPIMoJc41XQ_g_RZCMd1";
  const [Tumbnails, setTumbnails] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setloading] = useState(false);
  const scrollContainerRef = useRef();

  const handleWatchListChange = (videoid, platListId, index) => {
    props.setvideoIdsList((prevList) => {
      const exits = prevList.some((video) => video.videoId === videoid);
      if (exits) {
        return prevList.filter((video) => video.videoId !== videoid);
      }
      return [
        ...prevList,
        { videoId: videoid, PlayListID: platListId, videoIndex: index },
      ];
    });
  };

  const handleratingStateChange = (videoid) => {
    props.setratedVideoIds((prevVideoIds) => {
      if (prevVideoIds.includes(videoid)) {
        return prevVideoIds.filter((id) => id !== videoid);
      }
      return [...prevVideoIds, videoid];
    });
    props.onClose();
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy(window.screen.width / 1.4, 0);
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy(-window.screen.width / 1.4, 0);
  };

  const fetchTumbnails = async (Pagetoken = "") => {
    setloading(true);
    try {
      const playResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=12&pageToken=${Pagetoken}`
      );

      const videoIds = playResponse.data.items.map(
        (item) => item.snippet.resourceId.videoId
      );

      const statsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds.join(
          ","
        )}&key=${API_KEY}`
      );

      const statsMap = statsResponse.data.items.reduce((acc, item) => {
        acc[item.id] = {
          viewCount: item.statistics.viewCount,
          duration: item.contentDetails.duration,
        };
        return acc;
      }, {});

      const tumbnailsWithStats = playResponse.data.items.map((item) => ({
        ...item.snippet,
        viewCount: statsMap[item.snippet.resourceId.videoId].viewCount || "N/A",
        duration: statsMap[item.snippet.resourceId.videoId].duration || "N/A",
      }));

      setTumbnails((prevTumbnails) => [
        ...prevTumbnails,
        ...tumbnailsWithStats,
      ]);

      setNextPageToken(playResponse.data.nextPageToken || null);
    } catch (error) {
      console.log("Error while Feteching:", error);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchTumbnails();
  }, []);

  const loadmoreTumbnails = () => {
    const container = scrollContainerRef.current;
    if (
      nextPageToken &&
      container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10 &&
      !loading
    ) {
      fetchTumbnails(nextPageToken);
    }
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      return Math.floor(count / 1000000) + "M";
    } else if (count >= 1000) {
      return Math.floor(count / 1000) + "K";
    } else {
      return count.toString();
    }
  };

  const trucateTitle = (title, maxLength = 45) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const formatDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) {
      return "0:00";
    }
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;

    return `${hours > 0 ? hours + ":" : ""}${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div style={{ marginTop: "0px" }} className="TopratedShows">
      <div className="headlinesDiv">
        <p className="headline">Learning Essentials</p>
        <p className="miniheadline">
          Elevate your skills—discover our highest-rated courses for effective
          learning!
        </p>
      </div>
      <div
        onScroll={loadmoreTumbnails}
        ref={scrollContainerRef}
        className="contentDiv"
      >
        {Tumbnails.map((Tumbnail, index) => (
          <div className="topRatedVideo" key={Tumbnail.resourceId.videoId + "learning"}>
            <img
              className="playmodification"
              src={Tumbnail.thumbnails.medium.url}
              alt={Tumbnail.title}
            />
            <div className="videoDetails">
              <div className="videoBtns">
                <NavLink to="/Courses" state={{ videoIndex: index }}>
                  <button className="WatchNowBtn">Watch Now</button>
                </NavLink>
                <button
                  onClick={() =>
                    handleratingStateChange(Tumbnail.resourceId.videoId)
                  }
                  className="AddRating"
                >
                  {props.ratedVideoIds.includes(Tumbnail.resourceId.videoId) ? (
                    <FontAwesomeIcon
                      icon={fasStar}
                      size="lg"
                      style={{ color: "#ffffff" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={farStar}
                      size="lg"
                      style={{ color: "#ffffff" }}
                    />
                  )}
                </button>
                <button
                  onClick={() =>
                    handleWatchListChange(
                      Tumbnail.resourceId.videoId,
                      Tumbnail.playlistId,
                      index
                    )
                  }
                  className="AddWatchList"
                >
                  {props.videoIdsList.some(
                    (video) => video.videoId === Tumbnail.resourceId.videoId
                  ) ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="lg"
                      style={{ color: "#ffffff" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPlus}
                      size="lg"
                      style={{ color: "#ffffff" }}
                    />
                  )}
                </button>
              </div>
              <p className="videoTitle">{trucateTitle(Tumbnail.title)}</p>
              <p className="youtuber">
                <span style={{ marginRight: "5px" }}>
                  {Tumbnail.videoOwnerChannelTitle}
                </span>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="sm"
                  style={{ color: "#ffffff80" }}
                />
              </p>
              <div className="statistics">
                <p className="videoCount">
                  {formatCount(Tumbnail.viewCount)}
                  <span style={{ marginLeft: "4px" }}>views</span>
                </p>
                <p className="YTrating">
                  <FontAwesomeIcon
                    icon={faTrophy}
                    size="xs"
                    style={{ color: "#ffffff80" }}
                  />
                  <span style={{ marginLeft: "4px" }}>
                    {(Math.random() * 1 + 4).toFixed(1)}
                  </span>
                </p>
                <p className="videoDuration">
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    size="xs"
                    style={{ color: "#ffffff80" }}
                  />
                  <span style={{ marginLeft: "4px" }}>
                    {formatDuration(Tumbnail.duration)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={scrollRight} className="rightScrollBtn">
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2xl"
          style={{ color: "#ffffff" }}
        />
      </button>
      <button onClick={scrollLeft} className="leftScrollBtn">
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="2xl"
          style={{ color: "#ffffff" }}
        />
      </button>
    </div>
  );
};

export default LearningEssentials;

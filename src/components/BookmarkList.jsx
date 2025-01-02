import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../styles/bookmarkList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faClockRotateLeft,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const BookmarkList = (props) => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [Tumbnails, setTumbnails] = useState([]);
  const scrollContainerRef = useRef();

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy(window.screen.width / 1.4, 0);
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy(-window.screen.width / 1.4, 0);
  };

  const videoIds = props.videoIdList.map((video) => video.videoId);

  const fetchThumbnails = async () => {
    try {
      const statsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(
          ","
        )}&key=${API_KEY}`
      );

      const tumbnailsWithStats = statsResponse.data.items.map((item) => {
        const correspondingVideo = props.videoIdList.find(
          (video) => video.videoId === item.id
        );
        return {
          ...item.snippet,
          viewCount: item.statistics.viewCount || "N/A",
          duration: item.contentDetails.duration || "N/A",
          playListId: correspondingVideo ? correspondingVideo.PlayListID : null,
          videoIndex: correspondingVideo ? correspondingVideo.videoIndex : null,
        };
      });

      setTumbnails(tumbnailsWithStats);
    } catch (error) {
      console.log("Error while Fetching:", error);
    }
  };

  useEffect(() => {
    if (props.videoIdList.length >= 0) {
      fetchThumbnails();
    }
  }, [props.videoIdList]);

  const loadmoreThumbnails = () => {
    const container = scrollContainerRef.current;
    if (
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 10
    ) {
      fetchThumbnails();
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

  const truncateTitle = (title, maxLength = 40) => {
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
    <div className="bookmarkList">
      <div
        onScroll={loadmoreThumbnails}
        ref={scrollContainerRef}
        className="bookmarkDiv"
      >
        {Tumbnails.map((thumbnail, index) => (
          <div className="watchListVideo" key={thumbnail.title + "w"}>
            <img
              className="WatchListmodification"
              src={thumbnail.thumbnails.medium.url}
              alt={thumbnail.title}
            />
            <div className="watchListDetails">
              <NavLink
                to={
                  thumbnail.playListId === "PL-lPJw3tb8iDZy_3jRn7lx1nvZZSCvuc7"
                    ? "/StandUp"
                    : thumbnail.playListId ===
                      "PL-lPJw3tb8iAZ1v8-tVi3RQYYmwWA8SLI"
                    ? "/Podcasts"
                    : thumbnail.playListId ===
                      "PL-lPJw3tb8iAZCPIMoJc41XQ_g_RZCMd1"
                    ? "/Courses"
                    : thumbnail.playListId ===
                      "PL-lPJw3tb8iDfDp34JP0bXKOfHT7V5_I7"
                    ? "/Health"
                    : "/Creators"
                }
                state={{
                  videoIndex: thumbnail.videoIndex,
                  playlist: thumbnail.playListId,
                }}
              >
                <button className="watchListWatchNowBtn">Watch Now</button>
              </NavLink>
              <p className="watchListTitle">{truncateTitle(thumbnail.title)}</p>
              <p className="watchListyoutuber">
                <span>{thumbnail.channelTitle}</span>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  size="sm"
                  style={{ color: "#000000cc" }}
                />
              </p>
              <div className="watchListstatistics">
                <p className="watchListvideoCount">
                  {formatCount(thumbnail.viewCount)}
                  <span>views</span>
                </p>
                <p className="watchListvideoDuration">
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    size="xs"
                    style={{ color: "#00000" }}
                  />
                  <span>{formatDuration(thumbnail.duration)}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={scrollRight} className="watchListrightScrollBtn">
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2xl"
          style={{ color: "#ffffff" }}
        />
      </button>
      <button onClick={scrollLeft} className="watchListleftScrollBtn">
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="2xl"
          style={{ color: "#ffffff" }}
        />
      </button>
    </div>
  );
};

export default BookmarkList;

import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/standUpPage.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faComment,
  faStar,
  faPlus,
  faXmark,
  faBellSlash,
  faClockRotateLeft,
  faCircleCheck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const FitnessPage = (props) => {
  const location = useLocation();
  const { videoIndex = 0 } = location.state || {};
  const [inputValue, setinputValue] = useState("");
  const [commentFocus, setcommentFocus] = useState(false);
  const [commentBox, setcommentBox] = useState({});
  const [currentVideoId, setCurrentVideoId] = useState("");
  const commentRef = useRef(null);
  const [subscribe, setsubscribe] = useState(false);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const PLAYLIST_ID = "PL-lPJw3tb8iDfDp34JP0bXKOfHT7V5_I7";
  const [Tumbnails, setTumbnails] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setloading] = useState(false);
  const scrollContainerRef = useRef();
  const isDefaultVideoSet = useRef(false);

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

  const handleRatingStateChange = (videoid) => {
    props.setratedVideoIds((prevVideoIds) => {
      if (prevVideoIds.includes(videoid)) {
        return prevVideoIds.filter((id) => id !== videoid);
      }
      return [...prevVideoIds, videoid];
    });
    props.onClose();
  };

  const [mainVideoDetails, setmainVideoDetails] = useState({
    videoId: "",
    title: "",
    views: "",
    subscriberCount: "",
    channelImg: "",
    PlayListId: "",
    videoIndex: "",
    channelID: "",
  });

  useEffect(() => {
    if (Tumbnails.length > 0 && !isDefaultVideoSet.current) {
      handleTumnailClick(Tumbnails[videoIndex], videoIndex);
      isDefaultVideoSet.current = true;
    }
  }, [Tumbnails, videoIndex]);

  const handleTumnailClick = (tumbnail, videoIndex) => {
    setmainVideoDetails({
      videoId: tumbnail.resourceId.videoId,
      title: tumbnail.title,
      youtuber: tumbnail.videoOwnerChannelTitle,
      subscriberCount: tumbnail.SubscriberCount,
      channelImg: tumbnail.channelImg,
      PlayListId: tumbnail.playlistId,
      videoIndex: videoIndex,
      channelID: tumbnail.videoOwnerChannelId,
    });
    setCurrentVideoId(tumbnail.resourceId.videoId);
  };

  const fetchTumbnails = async (Pagetoken = "") => {
    setloading(true);
    try {
      const maxResults = videoIndex + 1 > 20 ? videoIndex + 1 : 20;
      const firstBatchLimit = 45;

      let allItems = [];

      // First API call for up to 50 videos
      const firstResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=${Math.min(
          firstBatchLimit,
          maxResults
        )}&pageToken=${Pagetoken}`
      );

      allItems = [...firstResponse.data.items];

      // If videoIndex > 50, fetch the remaining items
      if (maxResults > firstBatchLimit && firstResponse.data.nextPageToken) {
        const secondResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=${
            maxResults - firstBatchLimit
          }&pageToken=${firstResponse.data.nextPageToken}`
        );

        allItems = [...allItems, ...secondResponse.data.items];
      }

      // Map the combined results to fetch video statistics
      const videoIds = allItems.map((item) => item.snippet.resourceId.videoId);

      // Split videoIds into batches of 50
      const videoIdBatches = [];
      for (let i = 0; i < videoIds.length; i += 50) {
        videoIdBatches.push(videoIds.slice(i, i + 50));
      }

      let statsMap = {};
      // Fetch video statistics for each batch of video IDs
      for (let batch of videoIdBatches) {
        const statResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${batch.join(
            ","
          )}&key=${API_KEY}`
        );
        statResponse.data.items.forEach((item) => {
          statsMap[item.id] = {
            viewCount: item.statistics.viewCount,
            duration: item.contentDetails.duration,
          };
        });
      }

      // Fetch the channel details (Subscriber count, channel image)
      const channelIds = allItems.map(
        (item) => item.snippet.videoOwnerChannelId
      );
      const channelIdBatches = [];
      for (let i = 0; i < channelIds.length; i += 50) {
        channelIdBatches.push(channelIds.slice(i, i + 50));
      }

      let channelMap = {};
      // Fetch channel statistics for each batch of channel IDs
      for (let batch of channelIdBatches) {
        const channelResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${batch.join(
            ","
          )}&key=${API_KEY}`
        );
        channelResponse.data.items.forEach((item) => {
          channelMap[item.id] = {
            SubscriberCount: item.statistics.subscriberCount,
            channelImg: item.snippet.thumbnails.default.url,
          };
        });
      }

      // Combine statistics, channel info, and thumbnails
      const tumbnailsWithStats = allItems.map((item) => ({
        ...item.snippet,
        viewCount:
          statsMap[item.snippet.resourceId.videoId]?.viewCount || "N/A",
        duration: statsMap[item.snippet.resourceId.videoId]?.duration || "N/A",
        SubscriberCount:
          channelMap[item.snippet.videoOwnerChannelId]?.SubscriberCount ||
          "N/A",
        channelImg:
          channelMap[item.snippet.videoOwnerChannelId]?.channelImg || "N/A",
      }));

      // Update the state with the new thumbnails and statistics
      setTumbnails((prevTumbnails) => [
        ...prevTumbnails,
        ...tumbnailsWithStats,
      ]);

      setNextPageToken(firstResponse.data.nextPageToken || null);
    } catch (error) {
      console.error("Error while fetching:", error);
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
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 150 &&
      !loading
    ) {
      fetchTumbnails(nextPageToken);
    }
  };

  // ##########################################################

  const formatCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return Math.floor(count / 1000) + "K";
    } else {
      return count.toString();
    }
  };

  const trucateTitle = (title, maxLength = 40) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const trucateMainTitle = (title, maxLength = 80) => {
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

  // ##########################################################
  const handleinputChange = (event) => {
    setinputValue(event.target.value);
  };

  const handleDefaultBehavaior = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    setcommentBox((prev) => ({
      ...prev,
      [currentVideoId]: [...(prev[currentVideoId] || []), inputValue],
    }));
    setinputValue("");
  };

  const handleDelete = (commentIndex) => {
    setcommentBox((prev) => ({
      ...prev,
      [currentVideoId]: prev[currentVideoId].filter(
        (_, i) => i !== commentIndex
      ),
    }));
  };

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("commentBox")) || {};
    setcommentBox(storedComments);
  }, []);

  useEffect(() => {
    localStorage.setItem("commentBox", JSON.stringify(commentBox));
  }, [commentBox]);

  const handleCancel = () => {
    setinputValue("");
    setcommentFocus(false);
  };

  const handleBtnState = () => {
    setcommentFocus(true);
  };

  const handleCommentBtnClick = () => {
    if (commentFocus) {
      commentRef.current.blur();
    } else {
      commentRef.current.focus();
    }
    setcommentFocus(!commentFocus);
  };

  const handleSubscribe = () => {
    setsubscribe(!subscribe);
  };

  return (
    <div className="standUpPage">
      <div className="standupContentSection">
        <div className="videoAndControls">
          <div className="videoDisplayDiv">
            <iframe
              className="videoDisplay"
              src={`https://www.youtube.com/embed/${mainVideoDetails.videoId}?modestbranding=1&rel=0&controls=1&autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="controlBtns">
            <div className="titleAndViewsSection">
              <p className="mainVideoTitle">
                {trucateMainTitle(mainVideoDetails.title)}
              </p>
            </div>
            <div className="channelAndBtnSection">
              <div className="channelSection">
                <div className="channelImgDiv">
                  <img
                    className="channelImg"
                    src={mainVideoDetails.channelImg}
                    alt=""
                  />
                </div>
                <div className="channelNameAndSubscribers">
                  <NavLink
                    to="/Creators"
                    state={{ playlist: mainVideoDetails.channelID }}
                  >
                    <p className="mainChannelName">
                      <span style={{ marginRight: "5px" }}>
                        {mainVideoDetails.youtuber}
                      </span>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size="sm"
                        style={{ color: "#ffffff80" }}
                      />
                    </p>
                  </NavLink>
                  <p className="mainChannelSubscribers">
                    {formatCount(mainVideoDetails.subscriberCount)}
                    <span style={{ marginLeft: "4px" }}>Subscribers</span>
                  </p>
                </div>

                <button
                  onClick={handleSubscribe}
                  className="maincontrolBtn selfEnd"
                >
                  <FontAwesomeIcon
                    icon={subscribe ? faBell : faBellSlash}
                    size="sm"
                    style={{ color: "#ffffff" }}
                  />
                  {subscribe ? "Subscribed" : "Subscribe"}
                </button>
              </div>
              <div className="userControlSection">
                <button
                  onClick={handleCommentBtnClick}
                  className="maincontrolBtn"
                >
                  <FontAwesomeIcon
                    icon={faComment}
                    size="sm"
                    style={{ color: "#ffffff" }}
                  />
                  Comment
                </button>
                {props.ratedVideoIds.includes(mainVideoDetails.videoId) ? (
                  <button
                    onClick={() =>
                      handleRatingStateChange(mainVideoDetails.videoId)
                    }
                    className="maincontrolBtn"
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      size="sm"
                      style={{ color: "#ffffff" }}
                    />
                    Submitted
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleRatingStateChange(mainVideoDetails.videoId)
                    }
                    className="maincontrolBtn"
                  >
                    <FontAwesomeIcon
                      icon={faStar}
                      size="sm"
                      style={{ color: "#ffffff" }}
                    />
                    Your Rating
                  </button>
                )}
                {props.videoIdsList.some(
                  (video) => video.videoId === mainVideoDetails.videoId
                ) ? (
                  <button
                    onClick={() =>
                      handleWatchListChange(
                        mainVideoDetails.videoId,
                        mainVideoDetails.PlayListId,
                        mainVideoDetails.videoIndex
                      )
                    }
                    className="maincontrolBtn"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="lg"
                      style={{ color: "#ffffff" }}
                    />
                    Added
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleWatchListChange(
                        mainVideoDetails.videoId,
                        mainVideoDetails.PlayListId,
                        mainVideoDetails.videoIndex
                      )
                    }
                    className="maincontrolBtn"
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      size="lg"
                      style={{ color: "#ffffff" }}
                    />
                    Watchlist
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          onScroll={loadmoreTumbnails}
          ref={scrollContainerRef}
          className="playlistFeedSection"
        >
          {Tumbnails.map((Tumbnail, index) => (
            <div
              className="mainplaylistVideo"
              key={Tumbnail.resourceId.videoId + "fitnessPage"}
              onClick={() => handleTumnailClick(Tumbnail, index)}
            >
              <div className="mainPlaylistTumnailDiv">
                <img
                  className="mainPlaylistTumnail"
                  src={Tumbnail.thumbnails.medium.url}
                  alt={Tumbnail.title}
                />
              </div>
              <div className="mainPlaylistTumnailDetails">
                <p className="mainPlayListTumbnailTitle">
                  {trucateTitle(Tumbnail.title)}
                </p>
                <p className="mainPlayListTumbnailYoutuber">
                  <span style={{ marginRight: "5px" }}>
                    {Tumbnail.videoOwnerChannelTitle}
                  </span>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    size="xs"
                    style={{ color: "#ffffff80" }}
                  />
                </p>
                <div className="mainPlayListTumbnailViewsAndDurationDiv">
                  <p className="mainPlayListTumbnailViews">
                    {formatCount(Tumbnail.viewCount)}
                    <span style={{ marginLeft: "4px" }}>views</span>
                  </p>
                  <p className="mainPlayListTumbnailDuration">
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
      </div>
      <div className="commentSectionDiv">
        <div className="commentSection">
          <div className="commentFormDiv">
            <div className="userCommentPic">
              {props.FinaluserName.slice(0, 1)}
            </div>
            <form className="commentForm" onSubmit={handleDefaultBehavaior}>
              <input
                ref={commentRef}
                type="text"
                placeholder="Add a Comment.."
                className="commentText"
                value={inputValue}
                onChange={handleinputChange}
                onClick={handleBtnState}
              />
              {commentFocus && (
                <button onClick={handleCancel} className="commentCancelBtn">
                  Cancel
                </button>
              )}
              {commentFocus && (
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="commentSubmitBtn"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
          <div className="allCommentsDiv">
            <p className="commentTitle">
              Comments: <span>{(commentBox[currentVideoId] || []).length}</span>
            </p>
            {(commentBox[currentVideoId] || []).map((comment, index) => (
              <div className="commentDisplayFormat" key={index + "fitnessPage"}>
                <div className="userCommentPic">
                  {props.FinaluserName.slice(0, 1)}
                </div>
                <div className="userCommentFormat">
                  <p className="commentUserName">{props.FinaluserName}</p>
                  <p className="userComment">{comment}</p>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="deleteComment"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="2xl"
                    style={{ color: "#ffffff" }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessPage;

import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../styles/creators.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Creators = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const PLAYLIST_ID = "PL-lPJw3tb8iCP01ynBrH7b_dM4v_cuSn7";
  const [Tumbnails, setTumbnails] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setloading] = useState(false);
  const scrollContainerRef = useRef();

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

      const channelIds = playResponse.data.items.map(
        (item) => item.snippet.videoOwnerChannelId
      );

      const channelResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds.join(
          ","
        )}&key=${API_KEY}`
      );


      const channelData = channelResponse.data.items.reduce((acc, channel) => {
        acc[channel.id] = {
          channelUrl: channel.snippet.thumbnails.high.url,
          subscribers: channel.statistics.subscriberCount,
        };
        return acc;
      }, {});

      const creatorsData = playResponse.data.items.map((item) => ({
        ...item.snippet,
        profilePhoto: channelData[item.snippet.videoOwnerChannelId].channelUrl,
        subCount: channelData[item.snippet.videoOwnerChannelId].subscribers,
      }));

      setTumbnails((prevcreators) => [...prevcreators, ...creatorsData]);

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
      return count / 1000000 + "M";
    } else if (count >= 1000) {
      return count / 1000 + "K";
    } else {
      return count.toString();
    }
  };

  return (
    <div className="creators">
      <div className="headlinesDiv">
        <p className="headline">Creator Spotlight</p>
        <p className="miniheadline">
          Uncover the talent of top YouTubers—explore their channels and find
          your favorites!
        </p>
      </div>
      <div
        onScroll={loadmoreTumbnails}
        ref={scrollContainerRef}
        className="CreatorscontentDiv"
      >
        {Tumbnails.map((Tumbnail) => (
          <NavLink key={Tumbnail.resourceId.videoId + "creators"} to="/Creators" state={{playlist: Tumbnail.videoOwnerChannelId}}>
            <div className="creatorsImg">
              <img
                className="creatormodification"
                src={Tumbnail.profilePhoto}
                alt={Tumbnail.title}
              />
              <div className="creatorData">
                <p className="creatorName">{Tumbnail.videoOwnerChannelTitle}</p>
                <p className="creatorSubscribers">
                  {formatCount(Tumbnail.subCount)} subscribers
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      <button onClick={scrollRight} className="CreatorRightScrollBtn">
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2xl"
          style={{ color: "#ffffff" }}
        />
      </button>
      <button onClick={scrollLeft} className="creatorLeftScrollBtn">
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="2xl"
          style={{ color: "#ffffff" }}
        />
      </button>
    </div>
  );
};

export default Creators;

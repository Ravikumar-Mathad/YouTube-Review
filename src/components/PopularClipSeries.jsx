import React, { useState, useEffect} from "react";
import axios from "axios";
import "../styles/popularClipSeries.css";
import { OrbitProgress } from "react-loading-indicators";

const PopularClipSeries = (props) => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const PLAYLIST_ID = "PL-lPJw3tb8iBiRZaRpS79hpOo64j3w9sP";
  const [videos, setvideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setloading] = useState(false);

  const fetchVideos = async (Pagetoken = "") => {
    setloading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=8&pageToken=${Pagetoken}`
      );
      setvideos((prevVideos) => [...prevVideos, ...response.data.items]);
      setNextPageToken(response.data.nextPageToken || null);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const loadMoreVideos = () => {
    if (nextPageToken && !loading) {
      fetchVideos(nextPageToken);
    }
  };


  const updateNextData = () => {
    if (props.updateData % 3 === 0) {
      loadMoreVideos();
    }
  };

  useEffect(() => {
    setTimeout(updateNextData, 300);
  }, [props.updateData]);

  return (
    <div ref={props.refKey} className="popContentDiv">
      {videos.map((video) => (
        <iframe
          key={video.snippet.resourceId.videoId + "hightLights"}
          className="popContent"
          src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}?modestbranding=1&rel=0&controls=1`}
          allowFullScreen
        ></iframe>
      ))}
      {loading && (
        <div className="loadingElement">
          <OrbitProgress
            variant="spokes"
            color="#ffffff"
            size="medium"
            text=""
            textColor=""
          />
        </div>
      )}
    </div>
  );
};

export default PopularClipSeries;

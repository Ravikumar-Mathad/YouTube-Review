import React from "react";
import Mainpage from "../components/Mainpage";
import MissionPage from "../components/MissionPage";
import PopularClipPage from "../components/PopularClipPage";
import CategoriesPage from "../components/CategoriesPage";
import TopRatedShows from "../components/TopRatedShows";
import ComedyClassics from "../components/ComedyClassics";
import LearningEssentials from "../components/LearningEssentials";
import Creators from "../components/Creators";
import FitnessAndHealth from "../components/Fitness";

const HomePage = ({
  footerRef,
  setshowRatingPop,
  videoIds,
  setvideoIds,
  ratedVideoIds,
  setratedVideoIds,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <Mainpage footerRef={footerRef} />
      <MissionPage />
      <PopularClipPage />
      <CategoriesPage footerRef={footerRef} />
      <div style={{ marginTop: "5vh" }}>
        <TopRatedShows
          ratedVideoIds={ratedVideoIds}
          setratedVideoIds={setratedVideoIds}
          videoIdsList={videoIds}
          setvideoIdsList={setvideoIds}
          onClose={() => setshowRatingPop(true)}
        />
        <ComedyClassics
          ratedVideoIds={ratedVideoIds}
          setratedVideoIds={setratedVideoIds}
          videoIdsList={videoIds}
          setvideoIdsList={setvideoIds}
          onClose={() => setshowRatingPop(true)}
        />
        <Creators />
        <LearningEssentials
          ratedVideoIds={ratedVideoIds}
          setratedVideoIds={setratedVideoIds}
          videoIdsList={videoIds}
          setvideoIdsList={setvideoIds}
          onClose={() => setshowRatingPop(true)}
        />
        <FitnessAndHealth
          ratedVideoIds={ratedVideoIds}
          setratedVideoIds={setratedVideoIds}
          videoIdsList={videoIds}
          setvideoIdsList={setvideoIds}
          onClose={() => setshowRatingPop(true)}
        />
      </div>
    </div>
  );
};

export default HomePage;

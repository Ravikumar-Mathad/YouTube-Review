import React, { useState, useEffect } from "react";
import TopRatedShows from "./TopRatedShows";
import ComedyClassics from "./ComedyClassics";
import LearningEssentials from "./LearningEssentials";
import Creators from "./Creators";
import FitnessAndHealth from "./Fitness";
import StandUpPage from "./StandUpPage";
import PodcastPage from "./PodcastPage";
import CoursesPage from "./CoursesPage";
import FitnessPage from "./FitnessPage";
import CreatorsPage from "./creatorsPage";

const MainMediaHub = ({
  media,
  setshowRatingPop,
  videoIds,
  setvideoIds,
  ratedVideoIds,
  setratedVideoIds,
  FinaluserName,
}) => {
  const renderPage = () => {
    switch (media) {
      case "StandUp":
        return (
          <StandUpPage
            FinaluserName={FinaluserName}
            ratedVideoIds={ratedVideoIds}
            setratedVideoIds={setratedVideoIds}
            videoIdsList={videoIds}
            setvideoIdsList={setvideoIds}
            onClose={() => setshowRatingPop(true)}
          />
        );
      case "Podcast":
        return (
          <PodcastPage
            FinaluserName={FinaluserName}
            ratedVideoIds={ratedVideoIds}
            setratedVideoIds={setratedVideoIds}
            videoIdsList={videoIds}
            setvideoIdsList={setvideoIds}
            onClose={() => setshowRatingPop(true)}
          />
        );
      case "Courses":
        return (
          <CoursesPage
            FinaluserName={FinaluserName}
            ratedVideoIds={ratedVideoIds}
            setratedVideoIds={setratedVideoIds}
            videoIdsList={videoIds}
            setvideoIdsList={setvideoIds}
            onClose={() => setshowRatingPop(true)}
          />
        );
      case "Health":
        return (
          <FitnessPage
            FinaluserName={FinaluserName}
            ratedVideoIds={ratedVideoIds}
            setratedVideoIds={setratedVideoIds}
            videoIdsList={videoIds}
            setvideoIdsList={setvideoIds}
            onClose={() => setshowRatingPop(true)}
          />
        );
      case "Creators":
        return (
          <CreatorsPage
            FinaluserName={FinaluserName}
            ratedVideoIds={ratedVideoIds}
            setratedVideoIds={setratedVideoIds}
            videoIdsList={videoIds}
            setvideoIdsList={setvideoIds}
            onClose={() => setshowRatingPop(true)}
          />
        );
    }
  };
  return (
    <>
      {renderPage()}
      <div style={{ marginTop: "5vh" }}>
        {media !== "Podcast" && (
          <TopRatedShows
            ratedVideoIds={ratedVideoIds}
            setratedVideoIds={setratedVideoIds}
            videoIdsList={videoIds}
            setvideoIdsList={setvideoIds}
            onClose={() => setshowRatingPop(true)}
          />
        )}

        {media !== "StandUp" && (
          <ComedyClassics
            ratedVideoIds={ratedVideoIds}
            setratedVideoIds={setratedVideoIds}
            videoIdsList={videoIds}
            setvideoIdsList={setvideoIds}
            onClose={() => setshowRatingPop(true)}
          />
        )}
        {media != "Creators" && <Creators />}
        {media !== "Courses" && (
          <LearningEssentials
            ratedVideoIds={ratedVideoIds}
            setratedVideoIds={setratedVideoIds}
            videoIdsList={videoIds}
            setvideoIdsList={setvideoIds}
            onClose={() => setshowRatingPop(true)}
          />
        )}
        {media !== "Health" && (
          <FitnessAndHealth
            ratedVideoIds={ratedVideoIds}
            setratedVideoIds={setratedVideoIds}
            videoIdsList={videoIds}
            setvideoIdsList={setvideoIds}
            onClose={() => setshowRatingPop(true)}
          />
        )}
      </div>
    </>
  );
};

export default MainMediaHub;

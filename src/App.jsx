import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/App.css";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import MainMediaHub from "./components/MainMediaHub";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import RatingPop from "./components/RatingPop";
import ScrollOnTop from "./components/ScrollOnTop";
import UsernameInput from "./components/UsernameInput";

function App() {
  const [showRatingPop, setshowRatingPop] = useState(false);
  const [videoIds, setvideoIds] = useState([]);
  const [ratedVideoIds, setratedVideoIds] = useState([]);
  const [FinaluserName, setFinaluserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);

  useEffect(() => {
    const storedisNameSet =
      JSON.parse(localStorage.getItem("isNameSet")) || false;
    setIsNameSet(storedisNameSet);
  }, []);

  useEffect(() => {
    localStorage.setItem("isNameSet", JSON.stringify(isNameSet));
  }, [isNameSet]);

  useEffect(() => {
    const storedFinaluserName =
      JSON.parse(localStorage.getItem("FinaluserName")) || "Ravikumar Mathad";
    setFinaluserName(storedFinaluserName);
  }, []);

  useEffect(() => {
    localStorage.setItem("FinaluserName", JSON.stringify(FinaluserName));
  }, [FinaluserName]);

  useEffect(() => {
    const storedVideoIds = JSON.parse(localStorage.getItem("videoIds")) || [];
    setvideoIds(storedVideoIds);
  }, []);

  useEffect(() => {
    localStorage.setItem("videoIds", JSON.stringify(videoIds));
  }, [videoIds]);

  useEffect(() => {
    const storedVideoIds =
      JSON.parse(localStorage.getItem("ratedVideoIds")) || [];
    setratedVideoIds(storedVideoIds);
  }, []);

  useEffect(() => {
    localStorage.setItem("ratedVideoIds", JSON.stringify(ratedVideoIds));
  }, [ratedVideoIds]);

  const footerRef = useRef(null);

  return (
    <BrowserRouter>
      <ScrollOnTop />
      <NavBar />
      <UsernameInput
        FinaluserName={FinaluserName}
        setFinaluserName={setFinaluserName}
        setIsNameSet={setIsNameSet}
        isNameSet={isNameSet}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              footerRef={footerRef}
              setshowRatingPop={setshowRatingPop}
              videoIds={videoIds}
              setvideoIds={setvideoIds}
              ratedVideoIds={ratedVideoIds}
              setratedVideoIds={setratedVideoIds}
            />
          }
        />
        <Route
          path="/Home"
          element={
            <HomePage
              footerRef={footerRef}
              setshowRatingPop={setshowRatingPop}
              videoIds={videoIds}
              setvideoIds={setvideoIds}
              ratedVideoIds={ratedVideoIds}
              setratedVideoIds={setratedVideoIds}
            />
          }
        />
        <Route
          path="/standUp"
          element={
            <MainMediaHub
              media="StandUp"
              FinaluserName={FinaluserName}
              setshowRatingPop={setshowRatingPop}
              videoIds={videoIds}
              setvideoIds={setvideoIds}
              ratedVideoIds={ratedVideoIds}
              setratedVideoIds={setratedVideoIds}
            />
          }
        />
        <Route
          path="/Podcasts"
          element={
            <MainMediaHub
              media="Podcast"
              FinaluserName={FinaluserName}
              setshowRatingPop={setshowRatingPop}
              videoIds={videoIds}
              setvideoIds={setvideoIds}
              ratedVideoIds={ratedVideoIds}
              setratedVideoIds={setratedVideoIds}
            />
          }
        />
        <Route
          path="/Courses"
          element={
            <MainMediaHub
              media="Courses"
              FinaluserName={FinaluserName}
              setshowRatingPop={setshowRatingPop}
              videoIds={videoIds}
              setvideoIds={setvideoIds}
              ratedVideoIds={ratedVideoIds}
              setratedVideoIds={setratedVideoIds}
            />
          }
        />
        <Route
          path="/Health"
          element={
            <MainMediaHub
              media="Health"
              FinaluserName={FinaluserName}
              setshowRatingPop={setshowRatingPop}
              videoIds={videoIds}
              setvideoIds={setvideoIds}
              ratedVideoIds={ratedVideoIds}
              setratedVideoIds={setratedVideoIds}
            />
          }
        />
        <Route
          path="/Creators"
          element={
            <MainMediaHub
              media="Creators"
              FinaluserName={FinaluserName}
              setshowRatingPop={setshowRatingPop}
              videoIds={videoIds}
              setvideoIds={setvideoIds}
              ratedVideoIds={ratedVideoIds}
              setratedVideoIds={setratedVideoIds}
            />
          }
        />
        <Route
          path="/WatchList"
          element={
            <Profile videoIdsList={videoIds} FinaluserName={FinaluserName} />
          }
        />
      </Routes>
      <Footer ref={footerRef} />
      <RatingPop
        show={showRatingPop}
        ClosePop={() => setshowRatingPop(false)}
      />
    </BrowserRouter>
  );
}

export default App;

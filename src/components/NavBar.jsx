import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navBar.css";
import NewWatchlistBtn from "./NewWatchList";
import ProfileBtn from "./ProfileBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const refnavigators = useRef();
  const refaccountSection = useRef();
  const [MenuBar, setMenuBar] = useState(true);

  const responsiveNav = () => {
    refnavigators.current.classList.toggle("reponsiveNavigators");
    refaccountSection.current.classList.toggle("responsiveAccountSection");
    setMenuBar(!MenuBar);
  };

  const ScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header>
      <NavLink to="/Home" className="productName" onClick={ScrollToTop}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          width="36"
          viewBox="0 0 576 512"
        >
          <path
            fill="#000000"
            d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
          />
        </svg>
        YOUTUBE REVIEW
      </NavLink>
      <nav>
        <ul ref={refnavigators}>
          <li>
            <NavLink
              to="/StandUp"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              StandUp
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Podcasts"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Podcasts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Courses"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Health"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Health
            </NavLink>
          </li>
        </ul>
      </nav>
      <div ref={refaccountSection} className="accountSection">
        <NavLink to="/WatchList">
          <NewWatchlistBtn />
        </NavLink>
        <NavLink to="/WatchList">
          <ProfileBtn />
        </NavLink>
      </div>
      <button onClick={responsiveNav} className="menubarBtn">
        {MenuBar ? (
          <FontAwesomeIcon
            icon={faBars}
            size="xl"
            style={{ color: "#000000" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            style={{ color: "#000000" }}
          />
        )}
      </button>
    </header>
  );
};

export default NavBar;

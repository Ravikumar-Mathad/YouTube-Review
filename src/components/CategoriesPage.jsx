import React from "react";
import { NavLink } from "react-router-dom";
import ExploreBtn from "./ExploreBtn";
import ContactUsBtn from "./ContactUsBtn";
import "../styles/categoriesPage.css";
import standUpLogo from '../assets/stand up logo.png'
import podcastLogo from '../assets/podcast logo.png'
import coursesLogo from '../assets/courses logo.png'
import fitnessLogo from '../assets/fitness_logo new.png'

const CategoriesPage = (props) => {
  return (
    <div className="splitBoxes">
      <div className="leftBox">
        <p className="catgLine">
          Navigate diverse <span className="colorChange">categories</span> and
          discover what engages you.
        </p>
        <p className="catgDisc">
          Explore categories crafted to captivate and engage—find what inspires
          and entertains you most.
        </p>
        <div className="helpbtns2">
          <ExploreBtn />
          <ContactUsBtn footerRef={props.footerRef} />
        </div>
      </div>
      <div className="rightBox">
        <NavLink to="/StandUp">
          <div className="largeNav">
            <img
              className="standUpLogo"
              src={standUpLogo}
              alt="standup-logo"
            />
            <div className="catgDetails">
              <p className="catgName">Stand-Up Comedy</p>
              <p className="catgOverview">
                Looking for laughs? Explore our stand-up comedy specials for a
                good time!
              </p>
            </div>
          </div>
        </NavLink>
        <NavLink to="/Podcasts">
          <div className="largeNav">
            <img
              className="podcastLogo"
              src={podcastLogo}
              alt="podcast-logo"
            />
            <div className="catgDetails">
              <p className="catgName">Engaging Podcasts</p>
              <p className="catgOverview">
                Craving knowledge or laughs? Discover our podcasts for a perfect
                blend of both!
              </p>
            </div>
          </div>
        </NavLink>
        <NavLink to="/Courses">
          <div className="largeNav">
            <img
              className="coursesLogo"
              src={coursesLogo}
              alt="courses-logo"
            />
            <div className="catgDetails">
              <p className="catgName">Comprehensive Courses</p>
              <p className="catgOverview">
                Level up your expertise—explore our diverse courses designed to
                help you excel in your field!
              </p>
            </div>
          </div>
        </NavLink>
        <NavLink to="/Health">
          <div className="largeNav">
            <img
              className="creatorsLogo"
              src={fitnessLogo}
              alt="creators-logo"
            />
            <div className="catgDetails">
              <p className="catgName">Fitness and Health</p>
              <p className="catgOverview">
                Explore workouts, nutrition tips, and expert advice to inspire
                your wellness journey!
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default CategoriesPage;

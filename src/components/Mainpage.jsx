import React, {useRef} from "react";
import "../styles/mainPage.css";
import ExploreBtn from "./ExploreBtn";
import ContactUsBtn from "./ContactUsBtn";
import RatingPreview from "./ratingPreview";

const Mainpage = (props) => {
  return (
    <div className="splitContent">
      <main className="mainContent">
        <div className="productStatement">
          <h1 className="mainLine">
            Emphasizing the <br />
            Impact of YouTube Content
          </h1>
          <p className="description">
            Tired of scrolling through endless YouTube feeds? Discover the best
            YouTube content with
            <br />
            our unbiased reviews across various categories.
          </p>
        </div>
        <div className="helpbtns">
          <ExploreBtn />
          <ContactUsBtn footerRef={props.footerRef} />
        </div>
        <RatingPreview />
      </main>
      <img className="ContentImg" src="src\assets\main image.png" alt="ContentImg" />
    </div>
  );
};

export default Mainpage;

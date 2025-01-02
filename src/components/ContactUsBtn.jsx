import React from "react";
import "../styles/ContactBtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

const ContactUsBtn = ({ footerRef }) => {
  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <button onClick={scrollToFooter} className="contactUsBtn">
      <FontAwesomeIcon
        icon={faAddressBook}
        size="lg"
        style={{ color: "#000000" }}
      />
      Contact us
    </button>
  );
};

export default ContactUsBtn;

import React, { useState } from "react";
import "../styles/userinput.css";
import userNameImage from '../assets/userName image.png'

const UsernameInput = (props) => {
  const [inputValue, setinputValue] = useState("");

  const handleInputChange = (event) => {
    setinputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    props.setFinaluserName(inputValue.slice(0, 18).trim());
    setinputValue("");
    props.setIsNameSet(true);
  };

  if (props.isNameSet) return null;

  return (
    <div className="outerborder">
      <form onSubmit={handleSubmit} className="userInputBox">
        <img
          className="userinputAnimated"
          src={userNameImage}
          alt="userinput"
        />
        <p>Hey! What name do you go by?</p>
        <input
          autoFocus
          className="userText"
          placeholder="Your name..."
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="userSubmitBtn">Submit</button>
      </form>
    </div>
  );
};

export default UsernameInput;

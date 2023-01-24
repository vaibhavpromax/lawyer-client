import React from "react";
import "./LawyerProfile.css";
const LawyerProfile = (props) => {
  return (
    <div className="lawyer">
      <img className="image" src={props.image} alt="lawyer avatar" />
      <div>
        <h1 className="name">{props.name}</h1>
        <p>{props.contact}</p>
      </div>
    </div>
  );
};

export default LawyerProfile;

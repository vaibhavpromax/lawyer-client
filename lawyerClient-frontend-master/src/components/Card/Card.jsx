import React from "react";
import "./Card.scss";

const Card = ({ children, className = "", ...rest }) => {
  return (
    <div className={`lc-card ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;

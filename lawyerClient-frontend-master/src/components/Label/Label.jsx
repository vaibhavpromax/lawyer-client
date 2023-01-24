import React from "react";
import "./Label.scss";

const Label = ({ children, className = "", ...rest }) => {
  return (
    <label className={`lc-label ${className}`} {...rest}>
      {children}
    </label>
  );
};

export default Label;

import React from "react";
import "./Title.scss";
const Title = ({ children, size = "2rem", className, ...rest }) => {
  return (
    <div
      className={`lc-title ${className ?? ""}`}
      style={{ fontSize: size }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Title;

import React from "react";
import "./Div.module.scss";
import Skeleton from "../Skeleton/Skeleton";

const Div = ({ loading, className, loaderStyles, children, ...rest }) => {
  return (
    <div
      className={`modified-div ${className ?? ""} ${loading ? `loading` : ""}`}
      {...rest}
    >
      {loading && <Skeleton className={"loader"} styles={loaderStyles ?? {}} />}
      {children}
    </div>
  );
};

export default Div;

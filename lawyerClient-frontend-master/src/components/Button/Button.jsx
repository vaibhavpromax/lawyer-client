import React, { forwardRef } from "react";
import ButtonThemes from "./Themes.jsx";
import "./Button.scss";

const Button = (
  {
    children,
    type = "button",
    className = "",
    theme = ButtonThemes.PRIMARY,
    ...rest
  },
  ref
) => {
  return (
    <button
      ref={ref}
      type={type}
      className={`themed-button ${theme} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);

export const THEMES = ButtonThemes;

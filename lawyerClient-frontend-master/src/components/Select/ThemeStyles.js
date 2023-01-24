import { Colors } from "../../constants/Colors";

export const themeStyles = (width, height, menuOnTop) => {
  const normalStyles = {
    control: (current) => ({
      ...current,
      width,
      height,
      borderColor: "rgba(0, 0, 0, 0.272)",
      backgroundColor: "white",
      cursor: "pointer",
      fontWeight: "500",
      boxShadow: "none",
      minHeight: "initial",
      // borderRadius: "20px",
    }),
    dropdownIndicator: (current, { selectProps: { menuIsOpen } }) => ({
      ...current,
      color: "#567191",
      transition: "0.5s",
      padding: "0 10px",
      ...(menuIsOpen && {
        transform: "rotate(180deg)",
      }),
    }),
    indicatorSeparator: (current) => ({
      ...current,
      display: "none",
    }),
    menu: (current) => ({
      ...current,
      width,
      zIndex: "2",
      ...(menuOnTop && { bottom: "40px", top: "unset" }),
    }),
    menuList: (current) => ({
      ...current,
      padding: 0,
      maxHeight: "135px",
    }),
    option: (current, { isSelected, isFocused }) => ({
      ...current,
      ...(isSelected && {
        background:
          "linear-gradient(106.52deg, #A282E8 -11.57%, #7E8EE7 50.39%, #4499E9 116.35%)",
      }),
      ...(isFocused && {
        background: isSelected
          ? "linear-gradient(106.52deg, #A282E8 -11.57%, #7E8EE7 50.39%, #4499E9 116.35%)"
          : "linear-gradient(315deg, #deebdd 0%, #bbdbbe 74%);",
        color: isSelected ? "white" : "black",
      }),
      cursor: "pointer",
    }),
  };

  const transparentStyles = {
    control: (current) => ({
      ...current,
      width,
      border: "none",
      backgroundColor: "none",
      cursor: "pointer",
      fontWeight: "500",
      boxShadow: "none",
    }),
    dropdownIndicator: (current, { selectProps: { menuIsOpen } }) => ({
      ...current,
      color: Colors.blueShade1,
      transition: "0.5s",
      ...(menuIsOpen && {
        transform: "rotate(180deg)",
      }),
    }),
    indicatorSeparator: (current) => ({
      ...current,
      display: "none",
    }),
    menu: (current) => ({
      ...current,
      cursor: "pointer",
      top: "30px",
      zIndex: "2",
      ...(menuOnTop && { bottom: "30px", top: "unset" }),
    }),
    menuList: (current) => ({
      ...current,
      padding: 0,
      maxHeight: "135px",
    }),
    option: (current, { isSelected, isFocused }) => ({
      ...current,
      ...(isSelected && { backgroundColor: Colors.blueShade1 }),
      ...(isFocused && {
        backgroundColor: isSelected ? Colors.blueShade1 : Colors.whiteShade1,
        color: isSelected ? Colors.white : Colors.black,
      }),
      cursor: "pointer",
    }),
    singleValue: (current) => ({
      ...current,
      right: 0,
      textOverflow: "visible",
    }),
  };

  return [normalStyles, transparentStyles];
};

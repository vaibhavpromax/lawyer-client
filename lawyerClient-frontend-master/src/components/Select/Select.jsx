import React from "react";
import ReactSelect from "react-select";
import { themeStyles } from "./ThemeStyles";
import "./Select.scss";

const themes = {
  normal: "",
  transparent: "",
};

/**
 * This component is used to render a Select Option Component.
 *
 * @component
 * @example
 * const [value, setValue] = useState("option 1")
 *
 * return (
 * 	<Select
 *  	options={[
 *			{label: "Option 1", value: "option 1"},
 *			{label: "Option 2", value: "option 2"},
 *			{label: "Option 3", value: "option 3"}
 *		]}
 *		value={value}
 *		setValue={setValue}
 *	/>
 * )
 */

const Select = ({
  options,
  value,
  setValue,
  theme,
  width,
  height,
  placeholder,
  menuOnTop,
  disabled,
  isSearchable,
  ...rest
}) => {
  const [normalStyles, transparentStyles] = themeStyles(
    width,
    height,
    menuOnTop
  );

  themes.normal = normalStyles;
  themes.transparent = transparentStyles;

  const setSelected = (selected) => {
    // if (rest.isMulti) setValue(selected?.map((opt) => opt.value));
    setValue(selected.value);
  };

  let selectedOption;

  options = Object.keys(options).map((key) => ({
    label: options[key],
    value: key,
  }));

  options?.forEach((option) => {
    if (option.value === value) {
      selectedOption = option;
    }
  });

  return (
    <ReactSelect
      options={options}
      value={selectedOption}
      onChange={setSelected}
      styles={themes[theme]}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isDisabled={disabled}
      classNamePrefix="cadence-select"
      // menuIsOpen={true}
      {...rest}
    />
  );
};

Select.defaultProps = {
  theme: "normal",
  width: "100%",
  height: "50px",
  menuOnTop: false,
  disabled: false,
  isSearchable: false,
};

export default Select;

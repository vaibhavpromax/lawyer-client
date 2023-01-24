import React from "react";
import PropTypes from "prop-types";
import Select from "../../Select/Select";
// import InputNumber from "./InputNumber/InputNumber";
// import InputTime from "./InputTime/InputTime";

const InputSingle = ({
  type,
  value,
  setValue,
  name,
  width,
  height,
  className,
  small,
  ...rest
}) => {
  const onChange = (e) => {
    setValue(e.target.value);
  };

  switch (type) {
    case "select":
      return (
        <Select
          name={name}
          width={width}
          height={height}
          value={value}
          setValue={setValue}
          {...rest}
        />
      );
    case "textarea":
      return (
        <textarea
          style={{ width, height }}
          value={value}
          onChange={onChange}
          name={name}
          className={`crm-input ${className}`}
          {...rest}
        />
      );
    // case "number":
    // 	return (
    // 		<InputNumber
    // 			width={width}
    // 			height={height}
    // 			value={value}
    // 			setValue={setValue}
    // 			onChange={onChange}
    // 			name={name}
    // 			type={type}
    // 			small={small}
    // 			className={className}
    // 			{...rest}
    // 		/>
    // 	);
    // case "time":
    // 	return (
    // 		<InputTime
    // 			input={value}
    // 			setInput={setValue}
    // 			className={className}
    // 			{...rest}
    // 		/>
    // 	);
    default:
      return (
        <input
          style={{ width, height }}
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          className={`crm-input ${className} ${small && "small"}`}
          {...rest}
        />
      );
  }
};

InputSingle.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setValue: PropTypes.func,
  name: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  small: PropTypes.bool,
};

InputSingle.defaultProps = {
  type: "text",
  width: "100%",
  className: "",
  small: false,
};

export default InputSingle;

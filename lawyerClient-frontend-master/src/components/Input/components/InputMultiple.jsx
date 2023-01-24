import React from "react";
import PropTypes from "prop-types";
import Select from "../../Select/Select";
// import InputNumber from "./InputNumber/InputNumber";
// import InputTime from "./InputTime/InputTime";

const InputMultiple = ({
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
    setValue((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const setSelectValue = (value) => {
    setValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  switch (type) {
    case "select":
      return (
        <Select
          name={name}
          width={width}
          height={height}
          value={value[name]}
          setValue={setSelectValue}
          {...rest}
        />
      );
    case "textarea":
      return (
        <textarea
          style={{ width, height }}
          value={value[name]}
          onChange={onChange}
          name={name}
          className={`crm-input ${className}`}
          {...rest}
        />
      );
    // case "number":
    //   return (
    //     <InputNumber
    //       type={type}
    //       value={value}
    //       setValue={setValue}
    //       name={name}
    //       width={width}
    //       height={height}
    //       className={className}
    //       small={small}
    //       onChange={onChange}
    //       {...rest}
    //     />
    //   );
    // case "time":
    //   return (
    //     <InputTime
    //       input={value}
    //       setInput={setValue}
    //       className={className}
    //       name={name}
    //       {...rest}
    //     />
    //   );

    // case "date":
    // 	return (
    // 		<InputDate
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
          value={value[name]}
          onChange={onChange}
          name={name}
          type={type}
          className={`crm-input ${className} ${small && "small"}`}
          {...rest}
        />
      );
  }
};

InputMultiple.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  setValue: PropTypes.func,
  name: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  small: PropTypes.bool,
};

InputMultiple.defaultProps = {
  type: "text",
  width: "100%",
  className: "",
  small: false,
};

export default InputMultiple;

import React from "react";
import "./Input.scss";
import PropTypes from "prop-types";
import InputMultiple from "./components/InputMultiple";
import InputSingle from "./components/InputSingle";

/**
 * This component is used to take input from user.
 *
 * @param props.setValue - It will set the current input value into the state object key which is same as the name of input
 *
 * @component
 * @example
 * const [input, setInput] = useState({name: ""})
 * return (
 *   <Input name="name" value={input} setValue={setInput} />
 * )
 * @example
 * const [input, setInput] = useState("")
 * return (
 *   <Input value={input} setValue={setInput} />
 * )
 */

const Input = ({ value, ...rest }) => {
	const checkObject = typeof value === "object" && !Array.isArray(value);

	return checkObject ? (
		<InputMultiple value={value} {...rest} />
	) : (
		<InputSingle value={value} {...rest} />
	);
};

Input.propTypes = {
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number])
		.isRequired,
};

export default Input;

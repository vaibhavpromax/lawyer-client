import React from "react";
import "./InputNumber.scss";
import { ArrowDown } from "@crm-frontend/assets";
import PropTypes from "prop-types";
import { Colors } from "@crm-frontend/utils";

const InputNumber = ({
	type,
	value,
	setValue,
	name,
	width,
	height,
	onChange,
	className,
	small,
	showArrows,
	...rest
}) => {
	const checkObj = typeof value === "object";

	const changeValue = integer => {
		if (checkObj) {
			if (!(value[name] <= 0 && integer === -1)) {
				setValue(prevState => {
					return {
						...prevState,
						[name]: parseInt(value[name]) + integer,
					};
				});
			}
		} else {
			if (!(value <= 0 && integer === -1)) {
				setValue(parseInt(value + integer));
			}
		}
	};

	return (
		<div
			className={`crm-input-number-container ${className}`}
			style={{ width, height }}>
			<input
				value={checkObj ? value[name] : value}
				min="0"
				onChange={onChange}
				name={name}
				type={type}
				className={`crm-input ${small && "small"}`}
				{...rest}
			/>
			{showArrows && (
				<>
					<button
						className={`arrow-up ${small && "small"}`}
						onClick={() => {
							changeValue(1);
						}}>
						<ArrowDown
							style={{ transform: "rotate(180deg)" }}
							color={Colors.secondary}
						/>
					</button>
					<button
						className={`arrow-down ${small && "small"}`}
						onClick={() => {
							changeValue(-1);
						}}>
						<ArrowDown color={Colors.secondary} />
					</button>
				</>
			)}
		</div>
	);
};

InputNumber.propTypes = {
	type: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number])
		.isRequired,
	setValue: PropTypes.func,
	onChange: PropTypes.func,
	name: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	className: PropTypes.string,
	small: PropTypes.bool,
	showArrows: PropTypes.bool,
};

InputNumber.defaultProps = {
	type: "text",
	width: "100%",
	className: "",
	small: false,
	showArrows: false,
};

export default InputNumber;

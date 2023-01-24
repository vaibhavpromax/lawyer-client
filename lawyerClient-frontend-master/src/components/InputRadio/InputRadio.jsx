import React from "react";
import styles from "./InputRadio.module.scss";
import { Tick } from "@cadence-frontend/icons";

const InputRadio = ({ ...rest }) => {
	return (
		<label className={styles.radio}>
			<input type="radio" {...rest} />
			<span className={styles.checkmark}>
				<i>
					<Tick />
				</i>
			</span>
		</label>
	);
};

export default InputRadio;

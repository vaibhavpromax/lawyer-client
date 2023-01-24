import { useEffect } from "react";
import styles from "./SearchBar.module.scss";

import Input from "../Input/Input";
import { Search } from "@cadence-frontend/icons";

const SearchBar = ({ value, setValue, width = "100%", height, onSearch }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			if (value.length > 0 && typeof onSearch === "function") {
				onSearch(value);
			}
		}, 300);
		return () => clearTimeout(timer);
	}, [value]);

	return (
		<div className={styles.searchBarContainer} style={{ width: width, height: height }}>
			<div
				className={styles.searchIcon}
				onClick={() => {
					onSearch(value);
				}}>
				<Search />
			</div>
			<div className={styles.searchInput}>
				<Input
					type="text"
					value={value}
					setValue={setValue}
					className={styles.inputField}
					placeholder="Search"
					theme="WHITE"
				/>
			</div>
		</div>
	);
};

export default SearchBar;

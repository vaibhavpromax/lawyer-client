import { useState } from "react";

import { TriangleArrow } from "@cadence-frontend/icons";

import styles from "./CollapseContainer.module.scss";

const CollapseContainer = ({
  children,
  className,
  theme = "PRIMARY",
  openByDefault = true,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(openByDefault ?? false);

  return (
    <div className={`${styles.collapseContainer} ${className ?? ""}`}>
      <div
        className={styles.collapseHeader}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title}
        <button className={`${styles.arrow} ${isOpen && styles.arrowDown}`}>
          <TriangleArrow size="0.8rem" />
        </button>
      </div>
      <div className={`${styles.collapseChildren} ${isOpen && styles.open} `}>
        {children}
      </div>
    </div>
  );
};

export default CollapseContainer;

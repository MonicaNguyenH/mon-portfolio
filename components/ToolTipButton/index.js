import { useState } from "react";
import styles from "./ToolTipButton.module.css";

export default function ToolTipButton({ text, tooltipText }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={styles.textButton}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <span className={styles.tooltip}>{tooltipText}</span>}
      {text}
    </span>
  );
}
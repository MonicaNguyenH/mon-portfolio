import { useState } from "react";
import styles from './WorkFilter.module.css'

const filters = ["DEVELOPMENT", "GRAPHIC DESIGN", "UX/UI DESIGN", "MOTION GRAPHIC"];

export default function Filter({ onSelect }) {
  const [activeFilter, setActiveFilter] = useState("DEVELOPMENT"); // Default selected

  return (
    <>
        <div className={styles.mainContainer}>
            <div className={styles.filterContainer}>
                {filters.map((filter) => (
                    <span
                    key={filter}
                    className={`${styles.filterItem} ${activeFilter === filter ? styles.active : ""}`}
                    onClick={() => {
                        setActiveFilter(filter);
                        onSelect(filter);
                    }}
                    >
                    {filter}
                    </span>
                ))}
            </div>
        </div>
    </>
  );
}

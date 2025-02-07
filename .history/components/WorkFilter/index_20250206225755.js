import { useState } from "react";
import styles from './WorkFilter.module.css'

const filters = ["DEVELOPMENT", "GRAPHIC DESIGN", "UX/UI DESIGN", "MOTION GRAPHIC"];

export default function Filter({ onSelect }) {
  const [activeFilter, setActiveFilter] = useState("DEVELOPMENT"); // Default selected

  return (
    <div className="filter-container">
      {filters.map((filter) => (
        <span
          key={filter}
          className={`filter-item ${activeFilter === filter ? "active" : ""}`}
          onClick={() => {
            setActiveFilter(filter);
            onSelect(filter);
          }}
        >
          {filter}
        </span>
      ))}
    </div>
  );
}

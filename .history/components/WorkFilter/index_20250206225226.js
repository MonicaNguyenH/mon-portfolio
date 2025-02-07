import { useState } from "react";
import styles from './WorkFilter.module.css'

const filters = ["DEVELOPMENT", "GRAPHIC DESIGN", "UX/UI DESIGN", "MOTION GRAPHIC"];

export default function Filter({ onSelect }) {
  const [activeFilter, setActiveFilter] = useState("DEVELOPMENT"); // Default selected

  return (
    <div className="flex gap-6 justify-center text-gray-500 text-lg">
      {filters.map((filter) => (
        <span
          key={filter}
          className={`cursor-pointer transition-colors duration-300 ${
            activeFilter === filter ? "text-pink-500 font-semibold" : "hover:text-gray-700"
          }`}
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

"use client";
import { useState } from "react";
import styles from "./VerticalTab.module.css";

export default function VerticalTab() {
  const [activeTab, setActiveTab] = useState("poetry");

  return (
    <div className={styles.container}>
      {/* Poetry Column */}
      <div
        className={`${styles.column} ${activeTab === "poetry" ? styles.expanded : styles.collapsed}`}
        onClick={() => setActiveTab("poetry")}
      >
        {activeTab === "poetry" ? (
          <div>
            <h1 className="text-3xl font-bold">Poetry</h1>
            <p>This is the poetry section content.</p>
          </div>
        ) : (
          "Poetry"
        )}
      </div>

      {/* Drama Column */}
      <div
        className={`${styles.column} ${activeTab === "drama" ? styles.expanded : styles.collapsed}`}
        onClick={() => setActiveTab("drama")}
      >
        {activeTab === "drama" ? (
          <div>
            <h1 className="text-3xl font-bold">Dramaturgy</h1>
            <p>This is the dramaturgy section content.</p>
          </div>
        ) : (
          "Dramaturgy"
        )}
      </div>
    </div>
  );
}

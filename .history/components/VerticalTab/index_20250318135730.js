"use client";
import { useState } from "react";
import styles from "./VerticalTab.module.css";

export default function VerticalTab() {
  const [activeTab, setActiveTab] = useState("print");

  return (
    <div className={styles.container}>
      {/* Print Column */}
      <div
        className={`${styles.column} ${activeTab === "print" ? styles.expanded : styles.collapsed}`}
        onClick={() => setActiveTab("print")}
      >
        {activeTab === "print" ? (
          <div className={styles.content}>
            <h1 className="text-3xl font-bold">Print</h1>
            <p>
              More text... More text... More text... More text... More text... More text... More text...
            </p>
          </div>
        ) : (
          "Print"
        )}
      </div>

      {/* Drama Column */}
      <div
        className={`${styles.column} ${activeTab === "drama" ? styles.expanded : styles.collapsed}`}
        onClick={() => setActiveTab("drama")}
      >
        {activeTab === "drama" ? (
          <div className={styles.content}>
            <h1 className="text-3xl font-bold">Dramaturgy</h1>
            <p>
              This is the dramaturgy section content. This will also be scrollable if there’s too much text.
            </p>
            <p>
              Extra content... Extra content... Extra content... Extra content... Extra content...
            </p>
          </div>
        ) : (
          "Dramaturgy"
        )}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import styles from "./VerticalTab.module.css";

const tabs = [
  { id: "poetry", title: "Poetry", content: "This is the poetry tab content." },
  { id: "drama", title: "Dramaturgy", content: "This is the dramaturgy tab content." },
];

export default function VerticalTab() {
  // Default the first tab as open
  const [activeTab, setActiveTab] = useState("poetry");

  return (
    <div className={styles.container}>
      {/* Sidebar Tabs */}
      <div className={styles.sidebar}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.expanded : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>

      {/* Expanded Content (Only one active at a time) */}
      <div className={`${styles.contentContainer} ${activeTab ? "" : styles.hidden}`}>
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className={styles.content}>
                <h1 className="text-3xl font-bold">{tab.title}</h1>
                <p className="mt-4 text-lg">{tab.content}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
}

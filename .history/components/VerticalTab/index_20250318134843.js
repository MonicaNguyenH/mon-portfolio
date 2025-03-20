"use client";
import { useState } from "react";
import styles from "./VerticalTab.module.css";

const tabs = [
  { id: "poetry", title: "Poetry", content: "This is the poetry tab content." },
  { id: "drama", title: "Dramaturgy", content: "This is the dramaturgy tab content." },
];

export default function VerticalTab() {
  const [activeTab, setActiveTab] = useState("poetry"); // Default to first tab open

  return (
    <div className={styles.container}>
      {/* Sidebar Tabs */}
      <div className={styles.sidebar}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={styles.tab}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={styles.tab}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>

      {/* Poetry Column */}
      <div className={activeTab === "poetry" ? styles.expandedCol : styles.hiddenCol}>
        {activeTab === "poetry" && (
          <div className={styles.content}>
            <h1 className="text-3xl font-bold">Poetry</h1>
            <p>This is the poetry section content.</p>
          </div>
        )}
      </div>

      {/* Drama Column */}
      <div className={activeTab === "drama" ? styles.expandedCol : styles.hiddenCol}>
        {activeTab === "drama" && (
          <div className={styles.content}>
            <h1 className="text-3xl font-bold">Dramaturgy</h1>
            <p>This is the dramaturgy section content.</p>
          </div>
        )}
      </div>
    </div>
  );
}

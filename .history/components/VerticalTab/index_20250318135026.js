"use client";
import { useState } from "react";
import styles from "./VerticalTab.module.css";

const tabs = [
  { id: "poetry", title: "Poetry", content: "This is the poetry tab content." },
  { id: "drama", title: "Dramaturgy", content: "This is the dramaturgy tab content." },
];

export default function VerticalTab() {
  const [activeTab, setActiveTab] = useState("poetry"); // Default open tab

  return (
    <div className={styles.container}>
      {/* Sidebar Tabs (Stacked vertically) */}
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
      </div>

      {/* Poetry Tab (Expands right when active) */}
      <div className={activeTab === "poetry" ? styles.expanded : styles.hidden}>
        {activeTab === "poetry" && (
          <div className={styles.content}>
            <h1 className="text-3xl font-bold">Poetry</h1>
            <p>This is the poetry section content.</p>
          </div>
        )}
      </div>

      {/* Drama Tab (Expands right when active) */}
      <div className={activeTab === "drama" ? styles.expanded : styles.hidden}>
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

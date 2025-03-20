"use client"; // Required for Next.js App Router
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./VerticalTab.module.css";

const tabs = [
  { id: "poetry", title: "Poetry", content: "This is the poetry tab content." },
  { id: "drama", title: "Dramaturgy", content: "This is the dramaturgy tab content." },
];

export default function VerticalTab() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      {/* Sidebar (Vertical Tabs) */}
      <div className={styles.sidebar}>
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.expanded : ""}`}
            onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
            initial={{ width: 48 }}
            animate={{ width: activeTab === tab.id ? 300 : 48 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            {tab.title}
          </motion.div>
        ))}
      </div>

      {/* Expanded Tab Content */}
      <motion.div
        className={`${styles.contentContainer} ${activeTab ? "" : styles.hidden}`}
        animate={{ width: activeTab ? "calc(100% - 48px)" : "0%" }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                className={styles.content}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-3xl font-bold">{tab.title}</h1>
                <p className="mt-4 text-lg">{tab.content}</p>
              </motion.div>
            )
        )}
      </motion.div>
    </div>
  );
}

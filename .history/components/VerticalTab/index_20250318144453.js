"use client";
import { useState } from "react";
import styles from "./VerticalTab.module.css";

export default function VerticalTab() {
  const [activeTab, setActiveTab] = useState("print");

  return (
    <div className={styles.container}>
      {/* Print Column (Always visible) */}
      <div
        className={`${styles.column} ${activeTab === "print" ? styles.collapsed + " " + styles.active : styles.collapsed}`}
        onClick={() => setActiveTab("print")}
      >
        Print
      </div>

      {/* Print Content (Expands) */}
      <div className={activeTab === "print" ? styles.expanded : styles.hidden}>
        {activeTab === "print" && (
          <div className={styles.content}>
            <div className={styles.print}>
              <div className={styles.print__content}>
                <iframe
                  className={styles.indesign__print}
                  src="https://indd.adobe.com/embed/cab41585-505e-4441-9fb6-541fd30ed968?startpage=1&allowFullscreen=true"
                  frameBorder="0"
                  allowFullScreen=""
                ></iframe>
                <p className={styles.descText}>Print Version</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Digital Column (Always visible) */}
      <div
        className={`${styles.column} ${activeTab === "digital" ? styles.collapsed + " " + styles.active : styles.collapsed}`}
        onClick={() => setActiveTab("digital")}
      >
        Digital
      </div>

      {/* Digital Content (Expands) */}
      <div className={activeTab === "digital" ? styles.expanded : styles.hidden}>
        {activeTab === "digital" && (
          <div className={styles.content}>
            <div className={styles.digital}>
              <div className={styles.digital__content}>
                <iframe
                  className={styles.indesign__print}
                  src="https://indd.adobe.com/embed/082cc578-f77b-40c5-bf38-014d56fe7e8e?startpage=1&allowFullscreen=true"
                  width={525}
                  height={371}
                  frameBorder="0"
                  allowFullScreen=""
                ></iframe>
                <p className={styles.descText}>Digital Version</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
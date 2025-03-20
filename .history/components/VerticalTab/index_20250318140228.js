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
            <div className={styles.print}>
                <div className={styles.print__content}>
                    <iframe className={styles.indesign__print} src="https://indd.adobe.com/embed/cab41585-505e-4441-9fb6-541fd30ed968?startpage=1&allowFullscreen=true" frameborder="0" allowfullscreen=""></iframe> 
                    {/* <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/cab41585-505e-4441-9fb6-541fd30ed968?startpage=1&allowFullscreen=true" width="525px" height="371px" frameborder="0" allowfullscreen=""></iframe> */}
                    <p className={styles.descText}>Print Version</p>
                </div>
            </div>
          </div>
        ) : (
          "Print"
        )}
      </div>

      {/* Digital Column */}
      <div
        className={`${styles.column} ${activeTab === "digital" ? styles.expanded : styles.collapsed}`}
        onClick={() => setActiveTab("digital")}
      >
        {activeTab === "digital" ? (
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
          "Digital"
        )}
      </div>
    </div>
  );
}

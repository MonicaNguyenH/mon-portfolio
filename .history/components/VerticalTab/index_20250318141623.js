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
            <div className={styles.digital}>
                <div className={styles.digital__content}>
                    <iframe className={styles.indesign__print} src="https://indd.adobe.com/embed/082cc578-f77b-40c5-bf38-014d56fe7e8e?startpage=1&allowFullscreen=true" width={525} height={371} frameborder="0" allowfullscreen=""></iframe> 
                    {/* <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/082cc578-f77b-40c5-bf38-014d56fe7e8e?startpage=1&allowFullscreen=true" width="525px" height="371px" frameborder="0" allowfullscreen=""></iframe> */}
                    <p className={styles.descText}>Digital Version</p>
                </div>
            </div>
          </div>
        ) : (
          "Digital"
        )}
      </div>
    </div>
  );
}

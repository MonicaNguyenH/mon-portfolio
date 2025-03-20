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
          <div className={styles.content}>
            <h1 className="text-3xl font-bold">Poetry</h1>
            <p>
              This is the poetry section content. Add as much text as you want and it will be scrollable.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus lacus a odio
              fringilla, eu fermentum sapien venenatis. Duis at turpis nunc. Donec nec purus a felis
              gravida interdum sit amet nec eros.

              This is the poetry section content. Add as much text as you want and it will be scrollable.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus lacus a odio
              fringilla, eu fermentum sapien venenatis. Duis at turpis nunc. Donec nec purus a felis
              gravida interdum sit amet nec eros.

              This is the poetry section content. Add as much text as you want and it will be scrollable.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus lacus a odio
              fringilla, eu fermentum sapien venenatis. Duis at turpis nunc. Donec nec purus a felis
              gravida interdum sit amet nec eros.

              This is the poetry section content. Add as much text as you want and it will be scrollable.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus lacus a odio
              fringilla, eu fermentum sapien venenatis. Duis at turpis nunc. Donec nec purus a felis
              gravida interdum sit amet nec eros.

              This is the poetry section content. Add as much text as you want and it will be scrollable.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus lacus a odio
              fringilla, eu fermentum sapien venenatis. Duis at turpis nunc. Donec nec purus a felis
              gravida interdum sit amet nec eros.

              This is the poetry section content. Add as much text as you want and it will be scrollable.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus lacus a odio
              fringilla, eu fermentum sapien venenatis. Duis at turpis nunc. Donec nec purus a felis
              gravida interdum sit amet nec eros.

              This is the poetry section content. Add as much text as you want and it will be scrollable.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus lacus a odio
              fringilla, eu fermentum sapien venenatis. Duis at turpis nunc. Donec nec purus a felis
              gravida interdum sit amet nec eros.
            </p>
            <p>
              More text... More text... More text... More text... More text... More text... More text...
            </p>
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

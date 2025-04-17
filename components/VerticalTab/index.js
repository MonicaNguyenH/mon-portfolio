"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./VerticalTab.module.css";
import DragVietname from "../DragVietname";

export default function VerticalTab() {
  const [activeTab, setActiveTab] = useState("print");
  const printContentRef = useRef(null);
  const digitalContentRef = useRef(null);

  useEffect(() => {
  if (activeTab === "print") {
    gsap.fromTo(
      printContentRef.current,
      { width: "0%", opacity: 0 },
      { width: "92%", opacity: 1, duration: 0.4, ease: "elastic.out(1, 0.5)", immediateRender: false }
    );
    gsap.fromTo(
      digitalContentRef.current,
      { width: "92%", opacity: 1 },
      { width: "0%", opacity: 0, duration: 0.4, ease: "power2.inOut", immediateRender: false }
    );
  } else {
    gsap.fromTo(
      digitalContentRef.current,
      { width: "0%", opacity: 0 },
      { width: "92%", opacity: 1, duration: 0.4, ease: "elastic.out(1, 0.5)", immediateRender: false }
    );
    gsap.fromTo(
      printContentRef.current,
      { width: "92%", opacity: 1 },
      { width: "0%", opacity: 0, duration: 0.4, ease: "power2.inOut", immediateRender: false }
    );
  }
}, [activeTab]);

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
      <div ref={printContentRef} className={styles.hidden}>
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
            {/* <div className={styles.dragVietname}>
              <DragVietname />
            </div> */}
          </div>
        </div>
      </div>

      {/* Digital Column (Always visible) */}
      <div
        className={`${styles.column} ${activeTab === "digital" ? styles.collapsed + " " + styles.active : styles.collapsed}`}
        onClick={() => setActiveTab("digital")}
      >
        Digital
      </div>

      {/* Digital Content (Expands) */}
      <div ref={digitalContentRef} className={styles.hidden}>
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
      </div>
    </div>
  );
}
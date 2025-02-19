"use client"; // Ensures this runs only on the client side

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./BeepText.module.css";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

export default function BeepText() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.config({ trialWarn: false });

    if (textRef.current) {
      const paragraphs = textRef.current.querySelectorAll("p");

      paragraphs.forEach((target) => {
        gsap.fromTo(
          target,
          { opacity: 0, backgroundPositionX: "100%" }, // Start hidden and background masked
          {
            opacity: 1,
            backgroundPositionX: "0%", // Reveal text
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              markers: true, // REMOVE after debugging
              scrub: 1,
              start: "top 90%", // Trigger when text is about to enter view
              end: "top 40%", // End at a reasonable height
              toggleActions: "play reverse play reverse", // Play on enter, reverse on exit
            },
          }
        );
      });
    }
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.spacer}></div> {/* Ensures text starts off-screen */}
      
      <div className={styles.text} ref={textRef}>
        <p className="beep__main">BEEEEEEEEEEEEEEEEEEEEEEEEEE</p>
        <p className="beep__ep">EP</p>
      </div>

      <div className={styles.spacer}></div> {/* Ensures more scroll distance */}
    </section>
  );
}

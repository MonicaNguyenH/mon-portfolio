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
          { opacity: 0, y: 50 }, // Start hidden and move up
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              markers: true, // REMOVE this in production
              scrub: false, // Set to true for a smooth scrolling effect
              start: "top 85%", // Start when 85% of the element is in view
              end: "top 50%", // End before fully scrolling past it
              toggleActions: "play reverse play reverse", // Play on enter, reverse on exit
            },
          }
        );
      });
    }
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.spacer}></div> {/* Extra spacing to ensure correct trigger */}
      
      <div className={styles.text} ref={textRef}>
        <p>BEEEEEEEEEEEEEEEEEEEEEEEEEE</p>
        <p>EP</p>
      </div>

      <div className={styles.spacer}></div> {/* More space for better scrolling */}
    </section>
  );
}

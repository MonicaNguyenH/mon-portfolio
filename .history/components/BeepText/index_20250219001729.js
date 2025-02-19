"use client"; // Ensures this runs only on the client side

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; // Ensure correct GSAP import
import styles from "./BeepText.module.css";

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

export default function BeepText() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.config({ trialWarn: false });

    if (textRef.current) {
      const paragraphs = textRef.current.querySelectorAll("p");

      paragraphs.forEach((target) => {
        gsap.to(target, {
          backgroundPositionX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: target,
            markers: true, // Remove in production
            scrub: 1,
            start: "top bottom",
            end: "top center",
            toggleActions: "restart none none none",
            // once: true,
          },
        });
      });
    }
  }, []);

  return (
    <>
        <div className={styles.text} ref={textRef}>
            <p>BEEEEEEEEEEEEEEEEEEEEEEEEEEE</p> 
            <p>EP</p>
        </div>
    </>

  );
}
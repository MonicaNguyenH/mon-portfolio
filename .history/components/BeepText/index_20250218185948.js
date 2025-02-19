"use client"; // Ensure this component runs on the client side

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BeepText.module.css";

// Register Plugins
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
            markers: true, // Remove this in production
            scrub: 1,
            start: "top center",
            end: "bottom center",
          },
        });
      });
    }
  }, []);

  return (
    <div className={styles.text} ref={textRef}>
      <p>BEEEEEEE</p>
      <p>EP</p>
    </div>
  );
}

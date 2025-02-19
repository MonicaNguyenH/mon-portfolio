"use client"; // Ensure Next.js understands this runs on the client side

import { useEffect, useRef } from "react";
import styles from "./BeepText.module.css";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function BeepText() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.config({ trialWarn: false });

    if (textRef.current) {
      const split = new SplitText(textRef.current, { type: "lines" });

      split.lines.forEach((target) => {
        gsap.to(target, {
          backgroundPositionX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: target,
            markers: true,
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

"use client"; // Ensures this runs only on the client side

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./BeepText.module.css";

// SplitText is a GSAP Club plugin - Ensure it's available if you have a membership


// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function BeepText() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.config({ trialWarn: false });
    console.clear();

    if (textRef.current) {
      // Split text into lines for animation
      const split = new SplitText(textRef.current, { type: "lines" });

      split.lines.forEach((target) => {
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
    <>
      <img
        src="/img/graphic/beep/styleguide-1.png"
        alt="Beep styleguide 1"
        width={200}
        height={200}
      />
      <div className={styles.text} ref={textRef}>
        <span className="beep-main">BEEEEEEEEEEEEEEEEEEEEEEEEEEE</span>
        <span className="beep-ep">EP</span>
      </div>
    </>
  );
}

{/* <p ref={textRef}>
                <span className="beep-main">BEEEEEEEEEEEEEEEEEEEEEEEEEEE</span>
                <br />
                <span className="beep-ep">EP</span>
            </p> */}
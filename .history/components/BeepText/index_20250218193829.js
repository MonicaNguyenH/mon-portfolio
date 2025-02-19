"use client"; // Ensures this runs only on the client side

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./BeepText.module.css";

// If you have GSAP Club Membership, manually import SplitText
// import SplitText from "@/libs/gsap/SplitText"; 

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

export default function BeepText() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.config({ trialWarn: false });
    console.clear();

    if (textRef.current) {
      // Manually split text into lines (since SplitText is paid)
      const lines = textRef.current.querySelectorAll("span");

      lines.forEach((target) => {
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
        <p>
          <span className="beep-main">BEEEEEEEEEEEEEEEEEEEEEEEEEEE</span>
          <br />
          <span className="beep-ep">EP</span>
        </p>
      </div>
    </>
  );
}

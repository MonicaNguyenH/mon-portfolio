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
          { opacity: 0, y: 50 }, // Start hidden and slightly moved down
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              markers: true, // REMOVE this in production
              scrub: false, // Change to true if you want a more smooth appearance
              start: "top 80%", // Start when 80% of the element is visible
              end: "top 60%", // Animation completes earlier
              toggleActions: "restart none none none", // Play only when in view
            },
          }
        );
      });
    }
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.text} ref={textRef}>
        <p>BEEEEEEEEEEEEEEEEEEEEEEEEEEE</p>
        <p>EP</p>
      </div>
      <img
        src="/img/graphic/beep/styleguide-1.png"
        alt="Beep styleguide 1"
        width={200}
        height={200}
      />
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import styles from "./ComparisonSlider.module.css"; // Import module CSS

const ComparisonSlider = () => {
  const sectionRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevents SSR issues

    // Ensure images are fully loaded before running GSAP
    const images = document.querySelectorAll("img");
    let imagesLoaded = 0;

    images.forEach((img) => {
      if (img.complete) {
        imagesLoaded++;
      } else {
        img.addEventListener("load", () => {
          imagesLoaded++;
          if (imagesLoaded === images.length) {
            setIsReady(true);
          }
        });
      }
    });

    if (imagesLoaded === images.length) setIsReady(true); // Run if already loaded
  }, []);

  useEffect(() => {
    if (!isReady) return; // Only run GSAP when images are loaded

    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        if (sectionRef.current) {
          let section = sectionRef.current;

          ScrollTrigger.refresh(); // Ensures recalculation

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top bottom", // Start only when the section comes into view
              end: "+=100%", // Let it scroll naturally instead of pinning early
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true, // Ensures proper recalculation on page resize
            },
            defaults: { ease: "none" },
          });

          tl.fromTo(
            section.querySelector(`.${styles.afterImage}`),
            { xPercent: 100, x: 0 },
            { xPercent: 0 }
          )
            .fromTo(
              section.querySelector(`.${styles.afterImage} img`),
              { xPercent: -100, x: 0 },
              { xPercent: 0 },
              0
            )
            .fromTo(
              section.querySelector(`.${styles.thirdImage}`),
              { xPercent: 100, x: 0 },
              { xPercent: 0 },
              1
            )
            .fromTo(
              section.querySelector(`.${styles.thirdImage} img`),
              { xPercent: -100, x: 0 },
              { xPercent: 0 },
              1
            );

          ScrollTrigger.refresh();
        }
      });
    });

    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      });
    };
  }, [isReady]);

  return (
    <div ref={sectionRef}>
      <h1 className={styles.headerSection}>Scroll to see the before/after</h1>
      <section className={styles.comparisonSection}>
        <div className={`${styles.comparisonImage} ${styles.beforeImage}`}>
          <img
            src="https://assets.codepen.io/16327/before.jpg"
            alt="before"
          />
        </div>
        <div className={`${styles.comparisonImage} ${styles.afterImage}`}>
          <img
            src="https://assets.codepen.io/16327/after.jpg"
            alt="after"
          />
        </div>
        <div className={`${styles.comparisonImage} ${styles.thirdImage}`}>
          <img
            src="https://cdn.pixabay.com/photo/2018/10/24/05/14/kittycat-3769569_960_720.jpg"
            alt="third"
          />
        </div>
      </section>
      <h1 className={styles.headerSection}>What did you think?</h1>
    </div>
  );
};

export default ComparisonSlider;

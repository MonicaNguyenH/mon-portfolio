import { useEffect, useRef, useState } from "react";
import styles from "./ComparisonSlider.module.css"; // Import module CSS

const ComparisonSlider = () => {
  const sectionRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR issues

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
    if (!isReady) return; // Run GSAP only when images are fully loaded

    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        if (sectionRef.current) {
          let section = sectionRef.current;

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top center", // ✅ Only start when section is fully visible
              end: "bottom top", // ✅ Ensures it scrolls out naturally
              scrub: true,
              pin: true,
              pinSpacing: false, // ✅ Prevents blank space issue
              anticipatePin: 1,
              invalidateOnRefresh: true, // ✅ Ensures correct calculations on resize
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
    <div ref={sectionRef} className={styles.sliderContainer}>
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

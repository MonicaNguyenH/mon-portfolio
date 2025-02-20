import { useEffect, useRef } from "react";
import styles from "./ComparisonSlider.module.css"; // Import module CSS

const ComparisonSlider = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let gsap, ScrollTrigger;

    import("gsap").then((gsapModule) => {
      gsap = gsapModule.default;
      import("gsap/ScrollTrigger").then((scrollTriggerModule) => {
        ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        if (sectionRef.current) {
          let section = sectionRef.current;

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top bottom", // ✅ Starts at the right position
              end: "+=100%", // ✅ Ensures smooth scrolling
              scrub: true,
              pin: true,
              anticipatePin: 1,
              pinSpacing: false, // ✅ Prevents unwanted spacing issues
              invalidateOnRefresh: true, // ✅ Fixes any resizing issues
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
  }, []);

  return (
    <div ref={sectionRef} className={styles.main}>
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

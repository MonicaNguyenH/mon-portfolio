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
              start: "top center", // ✅ Fix: Start animation at the right time
              end: "+=" + section.offsetWidth, // ✅ Keep smooth horizontal scrolling
              scrub: true,
              pin: true,
              anticipatePin: 1,
              pinSpacing: true, // ✅ Fix: Prevent blank spaces
              invalidateOnRefresh: true,
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
    <div className={styles.wrapper}>
      <h1 class

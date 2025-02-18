"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ProjectHeaderSC.module.css";

export default function ProjectHeader({ name, description, img, introduction, tools, date }) {
  const buttonRef = useRef(null);
  const flairRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current || !flairRef.current) return;

    const button = buttonRef.current;
    const flair = flairRef.current;

    const xSet = gsap.quickSetter(flair, "xPercent");
    const ySet = gsap.quickSetter(flair, "yPercent");

    const getXY = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();

      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top),
      };
    };

    const handleMouseEnter = (e) => {
      const { x, y } = getXY(e);
      xSet(x);
      ySet(y);

      gsap.to(flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (e) => {
      const { x, y } = getXY(e);

      gsap.killTweensOf(flair);
      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mousemove", handleMouseMove);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.main}>
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={img} alt={name} />
      <div className={styles.intro}>
        <p>{introduction}</p>
        <a href="#" className={`${styles.button} ${styles.buttonStroke}`} data-block="button" ref={buttonRef}>
          <span className={styles.buttonFlair} ref={flairRef}></span>
          <span className={styles.buttonLabel}>Get GSAP</span>
        </a>
        <div className={styles.intro__detail}>
          <div className={styles.detail__toolsContainer}>
            {tools.map((tool, index) => (
              <p key={index} className={styles.detail__tool}>{tool}</p>
            ))}
          </div>
          <p className={styles.detail__date}>{date}</p>
        </div>
      </div>
    </div>
  );
}

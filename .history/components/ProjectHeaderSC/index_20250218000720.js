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

    gsap.set(flair, { scale: 0, xPercent: -50, yPercent: -50 });

    const getXY = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      return {
        x: ((e.clientX - left) / width) * 100,
        y: ((e.clientY - top) / height) * 100,
      };
    };

    const handleMouseEnter = (e) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(flair, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.main}>
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={img} alt={name} />
      <div className={styles.intro}>
        <p>{introduction}</p>
        <a href="#" ref={buttonRef} className={`${styles.button} ${styles.buttonStroke}`} data-block="button">
          <span className={styles.buttonFlair} ref={flairRef}></span>
          <span className={styles.buttonLabel}>Beep Prototype</span>
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

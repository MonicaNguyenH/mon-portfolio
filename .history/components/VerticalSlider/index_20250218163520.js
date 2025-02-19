import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./VerticalSlider.module.css";

const images = [
  "/img/graphic/beep/Persona-1.webp",
  "/img/graphic/beep/Persona-2.webp",
  "/img/graphic/beep/Persona-3.webp", // Add more if needed
];

export default function VerticalSlider() {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    sliderRef.current.style.transform = `translateY(-${index * 100}%)`;
  }, [index]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        <div className={styles.slider} ref={sliderRef}>
          {images.map((src, i) => (
            <div key={i} className={styles.slide}>
              <Image src={src} alt={`Persona ${i + 1}`} width={900} height={600} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button className={`${styles.navButton} ${styles.up}`} onClick={() => setIndex(index > 0 ? index - 1 : images.length - 1)}>▲</button>
      <button className={`${styles.navButton} ${styles.down}`} onClick={() => setIndex(index < images.length - 1 ? index + 1 : 0)}>▼</button>

      {/* Pagination Dots */}
      <div className={styles.dotsContainer}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${index === i ? styles.activeDot : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

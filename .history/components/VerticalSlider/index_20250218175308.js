import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./VerticalSlider.module.css";

const images = [
  "/img/graphic/beep/Persona-1.webp",
  "/img/graphic/beep/Persona-2.webp",
];

export default function VerticalSlider() {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  // 🔹 Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3s

    return () => clearInterval(interval);
  }, []);

  // 🔹 Update Slide Position
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateY(-${index * 100}%)`;
    }
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

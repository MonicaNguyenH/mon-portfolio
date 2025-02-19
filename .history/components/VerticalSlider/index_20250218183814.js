import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./VerticalSlider.module.css";

const images = [
  "/img/graphic/beep/Persona-1.png",
  "/img/graphic/beep/Persona-2.png",
];

export default function VerticalSlider() {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  // 🔹 Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 Update Slide Position
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateY(-${index * 100}%)`;
    }
  }, [index]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.sliderContainer}>
            <div className={styles.sliderWrapper}>
              <div className={styles.slider} ref={sliderRef}>
                {images.map((src, i) => (
                  <div key={i} className={styles.slide}>
                    <Image src={src} alt={`Persona ${i + 1}`} width={900} />
                  </div>
                ))}
              </div>
            </div>

            {/* 🔹 Vertical Pagination Dots (Now on the Right) */}
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
          <p>User personas</p>
      </div>
    </>
  );
}

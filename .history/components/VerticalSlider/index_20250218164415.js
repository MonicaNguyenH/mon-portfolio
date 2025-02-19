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
  const startY = useRef(0);
  const isDragging = useRef(false);
  const deltaY = useRef(0);

  // 🔹 Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 Update Slide Position
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.5s ease-in-out";
      sliderRef.current.style.transform = `translateY(-${index * 100}%)`;
    }
  }, [index]);

  // 🔹 Handle Drag Start
  const handleDragStart = (e) => {
    isDragging.current = true;
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
    if (sliderRef.current) {
      sliderRef.current.style.transition = "none"; // Disable animation for smooth drag
    }
  };

  // 🔹 Handle Drag Move
  const handleDragMove = (e) => {
    if (!isDragging.current) return;

    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    deltaY.current = currentY - startY.current;

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateY(${-index * 100 + deltaY.current / 6}%)`;
    }
  };

  // 🔹 Handle Drag End
  const handleDragEnd = () => {
    isDragging.current = false;
    if (Math.abs(deltaY.current) > 50) {
      if (deltaY.current > 0) {
        setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
      } else {
        setIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
      }
    } else {
      if (sliderRef.current) {
        sliderRef.current.style.transition = "transform 0.5s ease-in-out";
        sliderRef.current.style.transform = `translateY(-${index * 100}%)`;
      }
    }
    deltaY.current = 0;
  };

  return (
    <div
      className={styles.sliderContainer}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
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

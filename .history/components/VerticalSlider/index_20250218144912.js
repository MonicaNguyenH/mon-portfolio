import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from './VerticalSlider.module.css';

const images = [
  "/img/graphic/beep/beep-cover.png",
  "/img/graphic/beep/user-flow.png" 
];

export default function VerticalSlider() {
  const [index, setIndex] = useState(0);
  const totalSlides = images.length;

  const nextSlide = () => {
    if (index < totalSlides - 1) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.slider}
        style={{ transform: `translateY(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${i + 1}`} className={styles.image} />
        ))}
      </div>

      <div className={styles.buttons}>
        <button onClick={prevSlide} disabled={index === 0} className={styles.button}>
          Up
        </button>
        <button onClick={nextSlide} disabled={index === totalSlides - 1} className={styles.button}>
          Down
        </button>
      </div>
    </div>
  );
}
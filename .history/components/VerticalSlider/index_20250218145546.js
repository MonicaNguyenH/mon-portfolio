import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./VerticalSlider.module.css";

const images = [
  "/img/graphic/beep/user-flow.png",
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
      <motion.div
        className={styles.slider}
        animate={{ translateY: `-${index * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Slide ${i + 1}`} className={styles.image} />
        ))}
      </motion.div>

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

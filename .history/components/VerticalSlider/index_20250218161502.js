import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/img/graphic/beep/Persona-1.webp",
  "/img/graphic/beep/Persona-2.webp",
];

export default function VerticalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div className="slide" key={index}>
            <Image src={src} alt={`Slide ${index + 1}`} width={300} height={500} />
          </div>
        ))}
      </div>

      <button onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}>
        ↑ Prev
      </button>
      <button onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}>
        ↓ Next
      </button>
    </div>
  );
}

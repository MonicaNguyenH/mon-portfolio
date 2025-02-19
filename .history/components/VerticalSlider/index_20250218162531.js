import { useState, useRef } from "react";
import Image from "next/image";

const images = [
  "/img/graphic/beep/Persona-1.webp",
  "/img/graphic/beep/Persona-2.webp",
];

export default function VerticalSlider() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const startY = useRef(0);

  // Handle mouse wheel scrolling
  const handleWheel = (event) => {
    if (event.deltaY > 0 && index < images.length - 1) {
      setIndex((prev) => prev + 1);
    } else if (event.deltaY < 0 && index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  // Handle touch drag/swipe
  const handleTouchStart = (event) => {
    startY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    const deltaY = startY.current - event.touches[0].clientY;
    if (deltaY > 50 && index < images.length - 1) {
      setIndex((prev) => prev + 1);
    } else if (deltaY < -50 && index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className="slider-container"
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="slider" style={{ transform: `translateY(-${index * 100}%)` }}>
        {images.map((src, i) => (
          <div className="slide" key={i}>
            <Image src={src} alt={`Slide ${i + 1}`} width={300} height={400} priority />
          </div>
        ))}
      </div>

      <div className="slider-controls">
        <button onClick={() => setIndex((prev) => Math.max(0, prev - 1))} disabled={index === 0}>
          ↑ Prev
        </button>
        <button onClick={() => setIndex((prev) => Math.min(images.length - 1, prev + 1))} disabled={index === images.length - 1}>
          ↓ Next
        </button>
      </div>
    </div>
  );
}

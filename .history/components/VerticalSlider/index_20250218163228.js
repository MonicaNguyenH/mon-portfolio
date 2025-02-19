import { useState, useRef } from "react";
import Image from "next/image"; // Use Next.js Image component

const images = [
  "/img/graphic/beep/Persona-1.webp",
  "/img/graphic/beep/Persona-2.webp",
];

export default function VerticalSlider() {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);

  const scrollToImage = (newIndex) => {
    if (newIndex < 0 || newIndex >= images.length) return;
    setIndex(newIndex);
    sliderRef.current.style.transform = `translateY(-${newIndex * 100}%)`;
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <div className="slider" ref={sliderRef}>
          {images.map((src, i) => (
            <div key={i} className="slide">
              <Image src={src} alt={`Persona ${i + 1}`} width={900} height={200} />
            </div>
          ))}
        </div>
      </div>
      <button className="nav-button up" onClick={() => scrollToImage(index - 1)}>▲</button>
      <button className="nav-button down" onClick={() => scrollToImage(index + 1)}>▼</button>
    </div>
  );
}

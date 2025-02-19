import { useState, useEffect } from "react";

const slides = [
  "Slide 1: Welcome",
  "Slide 2: About Us",
  "Slide 3: Services",
  "Slide 4: Contact",
];

export default function VerticalSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      <div
        className="slides"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            {slide}
          </div>
        ))}
      </div>

      <button onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}>
        ↑ Prev
      </button>
      <button onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}>
        ↓ Next
      </button>
    </div>
  );
}

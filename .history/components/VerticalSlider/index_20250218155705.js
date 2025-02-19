import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
  carousel: {
    width: "200px",
    height: "200px",
    overflow: "hidden",
    position: "relative",
    border: "2px solid black",
    userSelect: "none",
  },
  slideContainer: {
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.5s ease-in-out",
  },
  slide: {
    width: "200px",
    height: "200px",
    flexShrink: 0,
  },
  indicators: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    right: "-30px",
    top: "50%",
    transform: "translateY(-50%)",
    gap: "10px",
  },
  dot: (isActive) => ({
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: isActive ? "white" : "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
  }),
};

const images = [
  "/img/graphic/beep/user-flow.png",
  "/img/graphic/beep/user-flow.png",
  "/img/graphic/beep/user-flow.png",
];

export default function VerticalSlider() {
  const [counter, setCounter] = useState(0);
  const startY = useRef(null);
  const isDragging = useRef(false);
  const autoPlayRef = useRef(null);

  // Move slide logic
  const moveSlide = (direction) => {
    setCounter((prev) => {
      const newIndex = prev + direction;
      return newIndex < 0 ? 0 : newIndex >= images.length ? images.length - 1 : newIndex;
    });
  };

  // Mouse & Touch Events
  const handleStart = (y) => {
    startY.current = y;
    isDragging.current = true;
  };

  const handleMove = (y) => {
    if (!isDragging.current || startY.current === null) return;
    const deltaY = startY.current - y;

    if (Math.abs(deltaY) > 50) {
      moveSlide(deltaY > 0 ? 1 : -1);
      isDragging.current = false; // Prevent multiple triggers
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  // Autoplay Functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCounter((prev) => (prev < images.length - 1 ? prev + 1 : 0)); // Loops back to start
    }, 3000);

    return () => clearInterval(autoPlayRef.current);
  }, []);

  return (
    <div style={styles.container}>
      <div
        style={styles.carousel}
        onTouchStart={(e) => handleStart(e.touches[0].clientY)}
        onTouchMove={(e) => handleMove(e.touches[0].clientY)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientY)}
        onMouseMove={(e) => handleMove(e.clientY)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        <div
          style={{
            ...styles.slideContainer,
            transform: `translateY(-${counter * 200}px)`,
          }}
        >
          {images.map((img, index) => (
            <div key={index} style={styles.slide}>
              <Image src={img} alt="Slide Image" width={200} height={200} />
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div style={styles.indicators}>
          {images.map((_, index) => (
            <div
              key={index}
              style={styles.dot(counter === index)}
              onClick={() => setCounter(index)}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button onClick={() => moveSlide(-1)} disabled={counter === 0}>
          Prev
        </button>
        <button onClick={() => moveSlide(1)} disabled={counter === images.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

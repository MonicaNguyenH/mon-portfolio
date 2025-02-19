import { useState, useRef } from "react";
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
  },
  slideContainer: {
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.25s ease-in-out",
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

  // Move to next slide
  const nextSlide = () => {
    if (counter < images.length - 1) {
      setCounter(counter + 1);
    }
  };

  // Move to previous slide
  const prevSlide = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  // Handle touch start event
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  // Handle touch move event
  const handleTouchMove = (e) => {
    if (!startY.current) return;
    const deltaY = startY.current - e.touches[0].clientY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) nextSlide();
      else prevSlide();
      startY.current = null;
    }
  };

  // Handle mouse down event
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY;
  };

  // Handle mouse move event
  const handleMouseMove = (e) => {
    if (!isDragging.current || startY.current === null) return;
    const deltaY = startY.current - e.clientY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) nextSlide();
      else prevSlide();
      isDragging.current = false; // Stop multiple transitions
    }
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.carousel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            ...styles.slideContainer,
            transform: `translateY(-${counter * 200}px)`,
          }}
        >
          {images.map((img, index) => (
            <div key={index} style={styles.slide}>
              <Image src={img} alt="Kitten" width={200} height={200} />
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
        <button onClick={prevSlide} disabled={counter === 0}>
          Prev
        </button>
        <button onClick={nextSlide} disabled={counter === images.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}





// const images = [
//   "/img/graphic/beep/user-flow.png",
//   "/img/graphic/beep/user-flow.png",
//   "/img/graphic/beep/user-flow.png",
// ];
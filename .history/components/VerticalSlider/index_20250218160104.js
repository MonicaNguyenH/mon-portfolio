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
    cursor: "grab",
  },
  slideContainer: {
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease-in-out",
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
      return Math.max(0, Math.min(newIndex, images.length - 1));
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

  // **DRAG FUNCTIONALITY**
  const dragStartY = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);

  const handleMouseDown = (e) => {
    dragStartY.current = e.clientY;
    isDragging.current = true;
    e.target.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientY - dragStartY.current;
    currentTranslate.current = prevTranslate.current + delta;
    e.target.style.transform = `translateY(${currentTranslate.current}px)`;
  };

  const handleMouseUp = (e) => {
    isDragging.current = false;
    e.target.style.cursor = "grab";
    const movedBy = currentTranslate.current - prevTranslate.current;
    prevTranslate.current = currentTranslate.current;

    if (movedBy < -50) {
      moveSlide(1);
    } else if (movedBy > 50) {
      moveSlide(-1);
    }

    e.target.style.transform = `translateY(0px)`;
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.carousel}
        onTouchStart={(e) => handleStart(e.touches[0].clientY)}
        onTouchMove={(e) => handleMove(e.touches[0].clientY)}
        onTouchEnd={handleEnd}
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

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

  const nextSlide = () => {
    if (counter < images.length - 1) {
      setCounter(counter + 1);
    }
  };

  const prevSlide = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!startY.current) return;
    const deltaY = startY.current - e.touches[0].clientY;

    if (deltaY > 50) {
      nextSlide();
    } else if (deltaY < -50) {
      prevSlide();
    }

    startY.current = null;
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.carousel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
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

        {/* Dots as navigation */}
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

      {/* Buttons for navigation */}
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
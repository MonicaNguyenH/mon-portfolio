import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  carousel: {
    listStyle: "none",
    width: "200px",
    height: "200px",
    padding: 0,
    border: "2px solid black",
    overflow: "hidden",
    position: "relative",
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
    gap: "10px",
    position: "absolute",
    right: "-30px",
    top: "50%",
    transform: "translateY(-50%)",
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

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!startY.current) return;
    const deltaY = startY.current - e.touches[0].clientY;
    if (deltaY > 50 && counter < images.length - 1) {
      setCounter((prev) => prev + 1);
    } else if (deltaY < -50 && counter > 0) {
      setCounter((prev) => prev - 1);
    }
    startY.current = null;
  };

  return (
    <div style={styles.container}>
      <div
        style={{ ...styles.carousel, height: "200px" }}
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
    </div>
  );
}



// const images = [
//   "/img/graphic/beep/user-flow.png",
//   "/img/graphic/beep/user-flow.png",
//   "/img/graphic/beep/user-flow.png",
// ];
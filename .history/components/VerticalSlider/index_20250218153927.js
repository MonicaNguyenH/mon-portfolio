import { useState } from "react";
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
  buttons: {
    display: "flex",
    gap: "1rem",
    marginTop: "10px",
  },
};

const images = [
  "/img/graphic/beep/user-flow.png",
  "/img/graphic/beep/user-flow.png",
  "/img/graphic/beep/user-flow.png",
];

export default function VerticalSlider() {
  const [counter, setCounter] = useState(0);

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

  return (
    <div style={styles.container}>
      <div style={{ ...styles.carousel, height: "200px" }}>
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
      </div>
      <div style={styles.buttons}>
        <button onClick={prevSlide} disabled={counter === 0}>Prev</button>
        <button onClick={nextSlide} disabled={counter === images.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

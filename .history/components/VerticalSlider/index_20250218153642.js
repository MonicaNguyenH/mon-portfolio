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
    display: "flex",
    flexDirection: "column",
    border: "2px solid black",
    overflow: "hidden",
    position: "relative",
  },
  slide: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "all 0.25s ease-in-out",
  },
  buttons: {
    display: "flex",
    gap: "1rem",
    marginTop: "10px",
  },
};

const images = [
  "https://static7.depositphotos.com/1000695/734/i/600/depositphotos_7343574-stock-photo-kitten-on-a-white-background.jpg",
  "https://static7.depositphotos.com/1000695/734/i/600/depositphotos_7343574-stock-photo-kitten-on-a-white-background.jpg",
  "https://static7.depositphotos.com/1000695/734/i/600/depositphotos_7343574-stock-photo-kitten-on-a-white-background.jpg",
  "https://static7.depositphotos.com/1000695/734/i/600/depositphotos_7343574-stock-photo-kitten-on-a-white-background.jpg",
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
      <ol style={styles.carousel}>
        {images.map((img, index) => (
          <li
            key={index}
            style={{
              ...styles.slide,
              transform: `translateY(-${counter * 100}%)`,
            }}
          >
            <Image src={img} alt="Kitten" width={200} height={200} />
          </li>
        ))}
      </ol>
      <div style={styles.buttons}>
        <button onClick={prevSlide} disabled={counter === 0}>Prev</button>
        <button onClick={nextSlide} disabled={counter === images.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

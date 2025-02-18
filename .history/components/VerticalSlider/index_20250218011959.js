import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "/img/graphic/beep/beep-cover.png",
  "/img/graphic/beep/user-flow.png" 
];

export default function VerticalSlider() {
  const [index, setIndex] = useState(0);

  // Automatic slide up and down
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle mouse scroll
  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      setIndex((prev) => (prev + 1) % images.length);
    } else {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div
      className="h-[400px] w-[300px] overflow-hidden border-2 border-gray-300 rounded-lg mx-auto relative"
      onWheel={handleScroll}
    >
      <motion.div
        className="flex flex-col"
        animate={{ y: -index * 400 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} alt={`Slide ${i + 1}`} className="w-[300px] h-[400px] object-cover" />
        ))}
      </motion.div>
    </div>
  );
}

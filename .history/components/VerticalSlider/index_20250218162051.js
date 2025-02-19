import { useState } from "react";
import { useSpring, animated } from "framer-motion";
// import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Image from "next/image";

const images = [
  "/img/graphic/beep/Persona-1.webp",
  "/img/graphic/beep/Persona-2.webp",
];

export default function VerticalSlider() {
  const [index, setIndex] = useState(0);

  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const bind = useDrag(({ offset: [, y], direction: [, dy], velocity }) => {
    if (velocity > 0.3) {
      if (dy > 0 && index > 0) setIndex(index - 1);
      if (dy < 0 && index < images.length - 1) setIndex(index + 1);
    }
    api.start({ y: -index * 100 + "%" });
  });

  return (
    <div className="slider-container" {...bind()}>
      <animated.div className="slider" style={{ y }}>
        {images.map((src, i) => (
          <div className="slide" key={i}>
            <Image src={src} alt={`Slide ${i + 1}`} layout="intrinsic" width={300} height={500} />
          </div>
        ))}
      </animated.div>
    </div>
  );
}

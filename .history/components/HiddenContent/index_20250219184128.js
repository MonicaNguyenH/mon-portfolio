import { useState, useRef, useEffect } from "react";
import styles from "./HiddenContent.module.css";

export default function HiddenContent({ imgFront, imgBack }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef(null);
    const maskRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setPosition({ x, y });

            if (maskRef.current) {
                maskRef.current.style.clipPath = `circle(200px at ${x}px ${y}px)`;
            }
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => {
            setIsHovering(false);
            if (maskRef.current) {
                maskRef.current.style.clipPath = "circle(0px at 50% 50%)";
            }
        };

        const element = containerRef.current;
        if (element) {
            element.addEventListener("mousemove", handleMouseMove);
            element.addEventListener("mouseenter", handleMouseEnter);
            element.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (element) {
                element.removeEventListener("mousemove", handleMouseMove);
                element.removeEventListener("mouseenter", handleMouseEnter);
                element.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    return (
        <div className={styles.hiddenContent} ref={containerRef}>
            {/* Background Image (Hidden Image) */}
            <img src={imgBack} alt="Hidden Image" className={styles.hiddenImg} />

            {/* Foreground Image (Mask Controlled) */}
            <div className={styles.mask} ref={maskRef}>
                <img src={imgFront} alt="Front Image" className={styles.frontImg} />
            </div>
        </div>
    );
}

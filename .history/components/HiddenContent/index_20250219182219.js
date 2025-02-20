import { useState, useRef, useEffect } from "react";
import styles from "./HiddenContent.module.css";

export default function HiddenContent({ imgFront, imgBack }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

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
            {/* Background Image */}
            <img src={imgBack} alt="Hidden Image" className={styles.hiddenImg} />

            {/* Foreground Image */}
            <img src={imgFront} alt="Front Image" className={styles.frontImg} />

            {/* Custom Circular Cursor Mask */}
            {isHovering && (
                <div
                    className={styles.cursor}
                    style={{ left: `${position.x}px`, top: `${position.y}px` }}
                ></div>
            )}
        </div>
    );
}

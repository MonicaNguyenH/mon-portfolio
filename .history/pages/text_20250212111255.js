import styles from './String.module.css';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function String() {
    const containerRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const pathElement = pathRef.current;

        // Default path (string at rest)
        const finalPath = `M 10 100 C 300 100 700 100 990 100`;

        const handleMouseMove = (event) => {
            const { offsetX, offsetY } = event;

            // Create more fluctuation across different parts of the curve
            const controlX1 = 300 + (offsetX - 500) * 0.3; // First wave
            const controlY1 = 100 + (offsetY - 100) * 0.6; 

            const controlX2 = 700 + (offsetX - 500) * -0.3; // Second wave
            const controlY2 = 100 + (offsetY - 100) * -0.6;

            const newPath = `M 10 100 C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, 990 100`;

            gsap.to(pathElement, {
                attr: { d: newPath },
                duration: 0.2,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(pathElement, {
                attr: { d: finalPath }, 
                duration: 2,
                ease: "elastic.out(1.5, 0.5)" // More exaggerated bounce
            });
        };

        if (container) {
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (container) {
                container.removeEventListener("mousemove", handleMouseMove);
                container.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    return (
        <div className={styles.string} ref={containerRef}>
            <svg width="1000" height="200" className={styles.svg}>
                <path ref={pathRef} d="M 10 100 C 300 100 700 100 990 100" stroke="var(--white)" fill="transparent"/>
            </svg>
        </div>
    );
}

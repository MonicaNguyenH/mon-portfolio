import styles from './String.module.css'
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function String() {
    const containerRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const pathElement = pathRef.current;

        // Default relaxed string
        const finalPath = `M 10 100 C 250 100, 750 100, 990 100`;

        const handleMouseMove = (event) => {
            const { offsetX, offsetY } = event;
            
            // Find how far along the string the mouse is (0 to 1 scale)
            const t = offsetX / 1000; 

            // Make the entire string stretch at any middle point
            const controlX1 = 250 + (offsetX - 500) * t * 0.8;
            const controlY1 = 100 + (offsetY - 100) * t * 1.2; 

            const controlX2 = 750 + (offsetX - 500) * (1 - t) * 0.8;
            const controlY2 = 100 + (offsetY - 100) * (1 - t) * 1.2;

            const newPath = `M 10 100 C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, 990 100`;

            gsap.to(pathElement, {
                attr: { d: newPath },
                duration: 0.2,
                ease: "power3.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(pathElement, {
                attr: { d: finalPath }, 
                duration: 2,
                ease: "elastic.out(1.2, 0.4)"
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
            <div className={styles.interactionLayer}></div>
            
            <svg width="1000" height="200" className={styles.svg}>
                <path ref={pathRef} d="M 10 100 C 250 100, 750 100, 990 100" stroke="var(--white)" fill="transparent"/>
            </svg>
        </div>
    );
}

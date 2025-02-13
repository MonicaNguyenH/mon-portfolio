import styles from './String.module.css';
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

            // Normalize input (minimized movement effect)
            const t = offsetX / 1000;
            
            const maxOffsetX = 8; // Extremely small controlled movement
            const maxOffsetY = 5;

            // Tiny nudges to control points
            const controlX1 = 250 + ((offsetX - 500) * t * 0.04); 
            const controlY1 = 100 + ((offsetY - 100) * t * maxOffsetY * 0.3); 

            const controlX2 = 750 + ((offsetX - 500) * (1 - t) * 0.04);
            const controlY2 = 100 + ((offsetY - 100) * (1 - t) * maxOffsetY * 0.3);

            const newPath = `M 10 100 C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, 990 100`;

            gsap.to(pathElement, {
                attr: { d: newPath },
                duration: 0.08, // Super fast response
                ease: "power1.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(pathElement, {
                attr: { d: finalPath }, 
                duration: 0.4, // Instant snap-back
                ease: "elastic.out(1.1, 0.5)" // Tighter bounce
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
                <path ref={pathRef} d="M 10 100 C 250 100, 750 100, 990 100" stroke="var(--white)" fill="transparent"/>
            </svg>
        </div>
    );
}

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
            
            // Normalize the offset values
            const t = offsetX / 1000; 

            // Reduce the range of movement to prevent excessive stretching
            const maxOffsetX = 40; 
            const maxOffsetY = 30;

            const controlX1 = 250 + ((offsetX - 500) * t * 0.4);
            const controlY1 = 100 + ((offsetY - 100) * t * maxOffsetY * 0.6); 

            const controlX2 = 750 + ((offsetX - 500) * (1 - t) * 0.4);
            const controlY2 = 100 + ((offsetY - 100) * (1 - t) * maxOffsetY * 0.6);

            const newPath = `M 10 100 C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, 990 100`;

            gsap.to(pathElement, {
                attr: { d: newPath },
                duration: 0.15, // Faster response
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(pathElement, {
                attr: { d: finalPath }, 
                duration: 1, // Shorter duration for a quicker snap-back
                ease: "elastic.out(1.4, 0.6)" // Sharper bounce
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

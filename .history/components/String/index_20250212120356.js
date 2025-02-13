import styles from './String.module.css';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function String() {
    const pathRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const pathElement = pathRef.current;
        
        const finalPath = `M 10 100 C 250 100, 750 100, 990 100`;

        const handleMouseMove = (event) => {
            const rect = container.getBoundingClientRect();
            const offsetX = event.clientX - rect.left; // Mouse X relative to container
            const offsetY = event.clientY - rect.top; // Mouse Y relative to container
            const width = rect.width;

            // Normalize X position between -1 and 1
            const t = (offsetX / width) * 2 - 1;  

            // Dynamically adjust the control points based on mouse position
            const controlX1 = 250 + t * 100;
            const controlY1 = 100 + (offsetY - 100) * 0.5;
            const controlX2 = 750 + t * -100;
            const controlY2 = 100 + (offsetY - 100) * -0.5;

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
        <div className={styles.stringContainer} ref={containerRef}>
            <svg width="1000" height="200" className={styles.svg}>
                <path ref={pathRef} d="M 10 100 C 250 100, 750 100, 990 100" stroke="var(--white)" fill="transparent"/>
            </svg>
        </div>
    );
}

import styles from './String.module.css';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function String() {
    const containerRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const pathElement = pathRef.current;

        // Fixed initial and final path (string at rest)
        const finalPath = `M 10 100 Q 500 100 990 100`;

        const handleMouseMove = (event) => {
            const { offsetX, offsetY } = event;

            // Modify only the control point (500 Y) in the middle
            const newPath = `M 10 100 Q 500 ${offsetY} 990 100`;

            gsap.to(pathElement, {
                attr: { d: newPath },
                duration: 0.3,
                ease: "power3.out"
            });
        };

        const handleMouseLeave = () => {
            // Animate back to resting position
            gsap.to(pathElement, {
                attr: { d: finalPath }, 
                duration: 1.5,
                ease: "elastic.out(1,0.2)"
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
                {/* This path is referenced for animation */}
                <path ref={pathRef} d="M 10 100 Q 500 100 990 100" stroke="var(--white)" fill="transparent"/>
            </svg>
        </div>
    );
}

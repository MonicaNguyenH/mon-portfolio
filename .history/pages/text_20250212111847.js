import styles from '@/styles/Testing.module.css';

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

            // The closer the mouse is to the middle, the more the effect
            const centerEffect = 1 - Math.abs(offsetX - 500) / 500; // 1 at center, 0 at edges

            // Create a stronger middle pull with some effect spreading to the sides
            const controlX1 = 250 + (offsetX - 500) * centerEffect * 1.2;
            const controlY1 = 100 + (offsetY - 100) * centerEffect * 1.5;

            const controlX2 = 750 + (offsetX - 500) * centerEffect * -1.2;
            const controlY2 = 100 + (offsetY - 100) * centerEffect * -1.5;

            const newPath = `M 10 100 C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, 990 100`;

            gsap.to(pathElement, {
                attr: { d: newPath },
                duration: 0.15, // Faster response
                ease: "power3.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(pathElement, {
                attr: { d: finalPath },
                duration: 2.5, // Smoother return
                ease: "elastic.out(1.8, 0.5)" // More exaggerated recoil
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


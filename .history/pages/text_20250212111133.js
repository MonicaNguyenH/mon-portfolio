import styles from '@/styles/Testing.module.css';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function String() {
    const containerRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const pathElement = pathRef.current;

        // Fixed start and end points
        const finalPath = `M 10 100 Q 500 100 990 100`;

        const handleMouseMove = (event) => {
            const { offsetX, offsetY } = event;
            
            // Increase flexibility by allowing more deviation in X and Y
            const controlX = 500 + (offsetX - 500) * 0.3; // Increased from 10% to 30%
            const controlY = 100 + (offsetY - 100) * 0.8; // Increased from 40% to 80% for greater flex

            const newPath = `M 10 100 Q ${controlX} ${controlY} 990 100`;

            gsap.to(pathElement, {
                attr: { d: newPath },
                duration: 0.2,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(pathElement, {
                attr: { d: finalPath }, 
                duration: 1.8,
                ease: "elastic.out(1.5, 0.4)" // Increased elasticity for more natural return
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
                <path ref={pathRef} d="M 10 100 Q 500 100 990 100" stroke="var(--white)" fill="transparent"/>
            </svg>
        </div>
    );
}

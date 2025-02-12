import styles from './String.module.css';
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
            
            // Make it more flexible by allowing X to slightly shift too
            const controlX = 500 + (offsetX - 500) * 0.1; // 10% movement of mouse X
            const controlY = 100 + (offsetY - 100) * 0.4; // 40% movement of mouse Y

            const newPath = `M 10 100 Q ${controlX} ${controlY} 990 100`;

            gsap.to(pathElement, {
                attr: { d: newPath },
                duration: 0.2, // Faster response
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(pathElement, {
                attr: { d: finalPath }, 
                duration: 1.8, // Slightly longer return animation
                ease: "elastic.out(1.2, 0.3)" // More bounce effect
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

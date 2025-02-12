import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './String.module.css';

export default function String() {
    const containerRef = useRef(null);
    const pathRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const path = pathRef.current;

        const finalPath = `M 10 100 Q 500 100 990 100`;

        const handleMouseMove = (event) => {
            const { offsetX, offsetY } = event;
            const newPath = `M 10 100 Q 500 ${offsetY} ${offsetX} 990 100`;

            gsap.to(path, {
                attr: { d: newPath },
                duration: 0.3,
                ease: "power3.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(path, {
                attr: { d: finalPath },
                duration: 1.5,
                ease: "elastic.out(1, 0.2)"
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

import styles from './String.module.css';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function String() {
    const pathRef = useRef(null);

    useEffect(() => {
        const pathElement = pathRef.current;
        const finalPath = `M 10 100 C 250 100, 750 100, 990 100`;

        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Normalize mouse position (0 to 1)
            const xFactor = clientX / width;
            const yFactor = clientY / height;

            // Adjust control points based on normalized mouse position
            const controlX1 = 250 + (xFactor - 0.5) * 400;
            const controlY1 = 100 + (yFactor - 0.5) * 100;
            const controlX2 = 750 + (xFactor - 0.5) * -400;
            const controlY2 = 100 + (yFactor - 0.5) * -100;

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

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <svg className={styles.string} width="1000" height="200">
            <path ref={pathRef} d="M 10 100 C 250 100, 750 100, 990 100" stroke="var(--white)" fill="transparent" />
        </svg>
    );
}

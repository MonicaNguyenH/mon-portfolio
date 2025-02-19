import { useEffect, useState, useRef } from "react";
import styles from './ButtonFilledBlack.module.css';
import gsap from "gsap";

export default function ButtonFilledBlack () {
    const buttonRef = useRef(null);
    const flairRef = useRef(null);

    useEffect(() => {
        if (!buttonRef.current || !flairRef.current) return;

        const button = buttonRef.current;
        const flair = flairRef.current;

        gsap.set(flair, { scale: 0, xPercent: -50, yPercent: -50 });

        const getXY = (e) => {
        const { left, top, width, height } = button.getBoundingClientRect();
        return {
            x: ((e.clientX - left) / width) * 100,
            y: ((e.clientY - top) / height) * 100,
        };
        };

        const handleMouseEnter = (e) => {
        const { x, y } = getXY(e);
        gsap.to(flair, {
            xPercent: x,
            yPercent: y,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
        });
        };

        const handleMouseMove = (e) => {
        const { x, y } = getXY(e);
        gsap.to(flair, {
            xPercent: x,
            yPercent: y,
            duration: 0.3,
            ease: "power2.out",
        });
        };

        const handleMouseLeave = () => {
        gsap.to(flair, {
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
        });
        };

        button.addEventListener("mouseenter", handleMouseEnter);
        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);
    return (
        <>
            <a href="https://beep-vlog.vercel.app/?fbclid=PAZXh0bgNhZW0CMTEAAaaCHucClo6VqehpxFYvfGwkRj1ENb8geTZp1p73uOZQf9GaIfHsj6LnWIw_aem_tNBp13fy_xXuCapluECM9A" ref={buttonRef} className={`${styles.button} ${styles.buttonStroke}`} data-block="button">
                <span className={styles.buttonFlair} ref={flairRef}></span>
                <span className={styles.buttonLabel}>Beep Blog</span>
            </a>
        </>
    )
}
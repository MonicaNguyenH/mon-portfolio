import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Marquee.module.css";

export default function Marquee() {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;

        const handleScroll = (event) => {
            if (event.deltaY > 0) {
                gsap.to(marquee, {
                    x: "-100%",
                    duration: 4,
                    ease: "none",
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.wrap(["0%", "-100%"]) 
                    }
                });
                gsap.to(".marquee img", { rotate: 180 });
            } else {
                gsap.to(marquee, {
                    x: "0%",
                    duration: 4,
                    ease: "none",
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.wrap(["-100%", "0%"]) 
                    }
                });
                gsap.to(".marquee img", { rotate: 0 });
            }
        };

        window.addEventListener("wheel", handleScroll);
        
        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.page1}></div>

            <div className={styles.page2}>
                <div className={styles.move} ref={marqueeRef}>
                    {["I DESIGN", "I CODE", "I CREATE", "PERIOD."].map((text, index) => (
                        <div className="marquee" key={index}>
                            <h1>{text}</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.page3}></div>
        </div>
    );
}

import styles from './Marquee.module.css'
import { useState, useEffect, useRef } from "react";
import gsap from 'gsap';

export default function Marquee() {

    useEffect(() => {
        const marqueeSpeed = 2; // Adjust speed (lower = faster)
    
        const handleScroll = (event) => {
            const moveDirection = event.deltaY > 0 ? "-200%" : "0%";
            const rotation = event.deltaY > 0 ? 180 : 0;
    
            gsap.to([".marquee", ".marquee img"], { // Animate both at the same time
                x: moveDirection,
                duration: marqueeSpeed,
                repeat: -1,
                ease: "none"
            });
    
            gsap.to(".marquee img", {
                rotate: rotation,
                duration: marqueeSpeed // Ensure rotation speed matches movement speed
            });
        };
    
        window.addEventListener("wheel", handleScroll);
    
        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    return (
        <>
            <div className={styles.main}>
                <div className={styles.page1}>

                </div>

                <div className={styles.page2}>
                    <div className={styles.move}>
                        <div className={`${styles.marquee} marquee`}>
                            <h1>I DESIGN</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={`${styles.marquee} marquee`}>
                            <h1>I CODE</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={`${styles.marquee} marquee`}>
                            <h1>I CREATE</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={`${styles.marquee} marquee`}>
                            <h1>PERIOD.</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>

                        <div className={`${styles.marquee} marquee`}>
                            <h1>I DESIGN</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={`${styles.marquee} marquee`}>
                            <h1>I CODE</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={`${styles.marquee} marquee`}>
                            <h1>I CREATE</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={`${styles.marquee} marquee`}>
                            <h1>PERIOD.</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        
                    </div>
                </div>

                <div className={styles.page3}>

                </div>
            </div>
        </>
    )
}
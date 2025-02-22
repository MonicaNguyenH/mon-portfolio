"use client"; // Required for Next.js client-side components
import { useEffect } from "react";
import gsap from "gsap";
import styles from "./Marquee.module.css";

export default function Marquee() {
    useEffect(() => {
        const handleScroll = (dets) => {
            if (dets.deltaY > 0) {
                gsap.to(".marquee", {
                    x: "-200%",
                    duration: 4,
                    repeat: -1,
                    ease: "none"
                });

                gsap.to(".marquee img", {
                    rotate: 180
                });

            } else {
                gsap.to(".marquee", {
                    x: "0%",
                    duration: 4,
                    repeat: -1,
                    ease: "none"
                });

                gsap.to(".marquee img", {
                    rotate: 0
                });
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
                <div className={styles.move}>
                    <div className="marquee">
                        <h1>I DESIGN</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>
                    <div className="marquee">
                        <h1>I CODE</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>
                    <div className="marquee">
                        <h1>I CREATE</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>
                    <div className="marquee">
                        <h1>PERIOD.</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>

                    <div className="marquee">
                        <h1>I DESIGN</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>
                    <div className="marquee">
                        <h1>I CODE</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>
                    <div className="marquee">
                        <h1>I CREATE</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>
                    <div className="marquee">
                        <h1>PERIOD.</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>
                </div>
            </div>

            <div className={styles.page3}></div>
        </div>
    );
}

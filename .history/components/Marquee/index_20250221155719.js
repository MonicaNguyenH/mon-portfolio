import { useEffect } from "react";
import gsap from "gsap";
import styles from "./Marquee.module.css";

export default function Marquee() {
    useEffect(() => {
        const handleScroll = (dets) => {
            const marquees = document.querySelectorAll(".marquee");
            const marqueeImgs = document.querySelectorAll(".marquee img");

            if (marquees.length === 0 || marqueeImgs.length === 0) return; // Prevent GSAP errors

            if (dets.deltaY > 0) {
                gsap.to(marquees, {
                    transform: 'translateX(-200%)',
                    duration: 4,
                    repeat: -1,
                    ease: "none"
                });

                gsap.to(marqueeImgs, {
                    rotate: 180
                });

            } else {
                gsap.to(marquees, {
                    transform: "translateX(0%)",
                    repeat: -1,
                    duration: 4,
                    ease: "none"
                });

                gsap.to(marqueeImgs, {
                    rotate: 0
                });
            }
        };

        setTimeout(() => { // Ensure elements are mounted before adding the event listener
            window.addEventListener("wheel", handleScroll);
        }, 100);

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    return (
        <>
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
        </>
    );
}

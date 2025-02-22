import styles from './Marquee.module.css'
import { useState, useEffect, useRef } from "react";
import gsap from 'gsap';

export default function Marquee() {

    useEffect(() => {
        const handleScroll = (dets) => {
            if (dets.deltaY > 0) {
                gsap.to(".marquee", {
                    x: '-200%',
                    duration: 3,
                    repeat: -1,
                    ease: "none"
                })

                gsap.to(".marquee img", {
                    rotate: 180
                })
            } else {
                gsap.to(".marquee", {
                    x: "0%",
                    repeat: -1,
                    duration: 3,
                    ease: "none"
                })
                gsap.to(".marquee img", {
                    rotate: 0
                })
            }
        };

        window.addEventListener("wheel", handleScroll);

        return () => {
            window.removeEventListener("wheel", handleScroll);
        }
    }, [])

    return (
        <>
            <div className={styles.main}>
       
                <div className={styles.move}>
                    {/* <div className={`${styles.marquee} marquee`}>
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
                    </div> */}

                    <div className={`${styles.marquee} marquee`}>
                        <h1>I devoured. Period.</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>

                    <div className={`${styles.marquee} marquee`}>
                        <h1>I devoured. Period.</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>

                    <div className={`${styles.marquee} marquee`}>
                        <h1>I devoured. Period.</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>

                    <div className={`${styles.marquee} marquee`}>
                        <h1>I devoured. Period.</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>

                    <div className={`${styles.marquee} marquee`}>
                        <h1>I devoured. Period.</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>

                    <div className={`${styles.marquee} marquee`}>
                        <h1>I devoured. Period.</h1>
                        <img src="/img/arrow.svg" alt="Arrow graphic" />
                    </div>
                </div>
            </div>
        </>
    )
}
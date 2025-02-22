import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Marquee.module.css';

class MarqueeAnimation {
    constructor(containerRef) {
        this.containerRef = containerRef;
        this.handleScroll = this.handleScroll.bind(this);
    }

    init() {
        window.addEventListener("wheel", this.handleScroll);
    }

    destroy() {
        window.removeEventListener("wheel", this.handleScroll);
    }

    handleScroll(event) {
        const marquees = this.containerRef.current.querySelectorAll('.marquee');
        
        if (event.deltaY > 0) {
            gsap.to(marquees, {
                x: '-200%',
                duration: 4,
                repeat: -1,
                ease: "none"
            });
            gsap.to(".marquee img", { rotate: 180 });
        } else {
            gsap.to(marquees, {
                x: '0%',
                duration: 4,
                repeat: -1,
                ease: "none"
            });
            gsap.to(".marquee img", { rotate: 0 });
        }
    }
}

export default function Marquee() {
    const containerRef = useRef(null);

    useEffect(() => {
        const marqueeAnimation = new MarqueeAnimation(containerRef);
        marqueeAnimation.init();

        return () => {
            marqueeAnimation.destroy();
        };
    }, []);

    return (
        <div className={styles.main} ref={containerRef}>
            <div className={styles.page1}></div>

            <div className={styles.page2}>
                <div className={styles.move}>
                    {["I DESIGN", "I CODE", "I CREATE", "PERIOD."].map((text, index) => (
                        <div className="marquee" key={index}>
                            <h1>{text}</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                    ))}
                    {["I DESIGN", "I CODE", "I CREATE", "PERIOD."].map((text, index) => (
                        <div className="marquee" key={index + 4}>
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

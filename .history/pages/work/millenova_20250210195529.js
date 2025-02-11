import HeaderArea from "@/components/HeadArea";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/ProjectHeader";
import styles from "@/styles/Millenova.module.css";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Millenova() {
    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];
    const horizontalRef = useRef(null);

    useEffect(() => {
        const horizontal = horizontalRef.current;
        const contents = gsap.utils.toArray(".content");

        gsap.to(horizontal, {
            // xPercent: -100 * (contents.length -1),
            x: () => `-${horizontal.scrollWidth - window.innerWidth}px`,
            scrollTrigger: {
                // trigger: "#horizontal",
                // pin: true,
                // scrub: 1,
                trigger: horizontal,
                start: "top top",
                end: () => `+=${horizontal.scrollWidth}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []);


    return (
        <>
            <HeaderArea title="Millenova" description="Millenova"/>

            <NavBar />

            <div className={styles.main}>
                <ProjectHeader 
                    name="Millenova" 
                    description="GRAPHIC DESIGN" 
                    img="/img/graphic/millenova/cover.webp" 
                    introduction="The Millenova exhibition poster draws inspiration from Dior's SS 2000 campaign, reinterpreted with bold visuals and innovative techniques. It creates a piece that reflects the era's timeless influence—colorful, innovative, and unapologetically bold. Perfect for showcasing how design connects past trends with today's culture and celebrates the 2000s' lasting impact on contemporary fashion."
                    tools={projectTools}
                    date="Sept 2024"
                />

                <img  src="/img/graphic/millenova/2ver.webp" alt="Millenova versions" className={styles.img} />

                <section className={styles.horizontal} ref={horizontalRef}>
                    <div className={styles.content}>
                        <img src="/img/graphic/millenova/slider1.webp" alt="Millenova slider 1" className={styles.slider__img}/>
                    </div>

                    <div className={styles.content}>
                        <img src="/img/graphic/millenova/slider2.webp" alt="Millenova slider 1" className={styles.slider__img} />
                    </div>

                    <div className={styles.content}>
                        <img src="/img/graphic/millenova/slider3.webp" alt="Millenova slider 1" />
                    </div>
                </section>

            </div>

            <Footer />
        </>
    )
}
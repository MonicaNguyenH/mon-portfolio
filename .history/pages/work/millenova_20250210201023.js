import HeaderArea from "@/components/HeadArea";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/ProjectHeader";
import styles from "@/styles/Millenova.module.css";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

export default function Millenova() {
    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];
    const horizontalRef = useRef(null);

    useEffect(() => {
        async function loadGSAP() {
            const gsapModule = await import("gsap");
            const ScrollTriggerModule = await import("gsap/ScrollTrigger");

            const { default: gsap } = gsapModule;
            const { ScrollTrigger } = ScrollTriggerModule;

            gsap.registerPlugin(ScrollTrigger);

            const horizontal = horizontalRef.current;
            const contents = gsap.utils.toArray(".content");

            gsap.to(horizontal, {
                x: () => `-${horizontal.scrollWidth - window.innerWidth}px`,
                ease: "power3.out", // Smooth easing
                scrollTrigger: {
                    trigger: horizontal,
                    start: "top top",
                    end: () => `+=${horizontal.scrollWidth}`,
                    pin: true,
                    scrub: 2,
                    anticipatePin: 0.5,
                    snap: {
                        snapTo: "labels", // Snap to sections smoothly
                        duration: 0.6, // Time to reach the snap
                        ease: "power2.inOut" // Soft easing effect
                    },
                    invalidateOnRefresh: true,
                }
            });
        }

        loadGSAP();

        return () => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            });
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
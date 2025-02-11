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
        if (typeof window === "undefined") return;
        async function loadGSAP() {
            const gsapModule = await import("gsap");
            const ScrollTriggerModule = await import("gsap/ScrollTrigger");

            const { default: gsap } = gsapModule;
            const { ScrollTrigger } = ScrollTriggerModule;

            gsap.registerPlugin(ScrollTrigger);

            const horizontal = horizontalRef.current;
            if (!horizontal) return; // Prevent crash if ref is null
            
            const contents = gsap.utils.toArray(".content");

            ScrollTrigger.create({
                trigger: horizontal,
                start: "top top+=1", // Wait until the section fully enters
                end: () => `+=${horizontal.scrollWidth || 1000}`, // 🔥 Fix: Prevent crash
                pin: true,
                anticipatePin: 0.3, // Reduce aggressive snap
                scrub: 1.2, // Make it smoother
                onEnter: () => console.log("Scrolling into slider"),
                onLeaveBack: () => console.log("Leaving slider (scrolling up)"),
                invalidateOnRefresh: true,
            });

            gsap.to(horizontal, {
                x: () => `-${horizontal.scrollWidth - window.innerWidth || 1000}px`, // 🔥 Fix: Prevent crash
                ease: "power2.out",
                scrollTrigger: {
                    trigger: horizontal,
                    start: "top top+=5%", // Prevent early activation
                    end: () => `+=${horizontal.scrollWidth - 50 || 1000}`, // 🔥 Fix: Prevent crash
                    scrub: 1.5,
                    snap: {
                        snapTo: 1 / (contents.length - 1),
                        duration: 0.4,
                        ease: "power2.inOut",
                    },
                    anticipatePin: 0.5,
                    invalidateOnRefresh: true,
                }
            });

            ScrollTrigger.refresh();
            
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
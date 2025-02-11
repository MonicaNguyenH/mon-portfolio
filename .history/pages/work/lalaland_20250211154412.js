import HeaderArea from "@/components/HeadArea";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/ProjectHeader";
import styles from "@/styles/Lalaland.module.css";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

export default function Millenova() {
    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];
    const horizontalRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") return; // Prevents SSR issues

        // ✅ Ensure all images are fully loaded before running GSAP
        const images = document.querySelectorAll("img");
        let imagesLoaded = 0;

        images.forEach((img) => {
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.addEventListener("load", () => {
                    imagesLoaded++;
                    if (imagesLoaded === images.length) {
                        setIsReady(true);
                    }
                });
            }
        });

        if (imagesLoaded === images.length) setIsReady(true); // Run if already loaded
    }, []);

    useEffect(() => {
        if (!isReady) return; // ✅ Ensure GSAP only runs when images are fully loaded

        import("gsap").then(({ default: gsap }) => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);

                const horizontal = horizontalRef.current;
                if (!horizontal) return;

                const scrollWidth = horizontal.scrollWidth - window.innerWidth;
                if (scrollWidth <= 0) return;

                gsap.to(horizontal, {
                    x: `-${scrollWidth}px`,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: horizontal,
                        start: "top top",
                        end: `+=${scrollWidth}`,
                        pin: true,
                        scrub: 1.2,
                        anticipatePin: 0.3,
                        invalidateOnRefresh: true,
                    }
                });

                console.log("GSAP: Running animation after images load...");
                ScrollTrigger.refresh(); // 🔥 Ensures animation recalculates
            });
        });

        return () => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            });
        };
    }, [isReady]); // ✅ Runs GSAP only when images are loaded


    return (
        <>
            <HeaderArea title="Millenova" description="Millenova"/>

            <NavBar />

            <div className={styles.main}>
                <ProjectHeader 
                    name="Lalaland" 
                    description="GRAPHIC DESIGN" 
                    img="/img/graphic/lalaland/cover.webp" 
                    introduction={`This La La Land poster captures the heart of the film through thoughtful symbolism. The gradient draws from the iconic "A Lovely Night" dance scene, blending dusk and dreams. The vinyl record represents Sebastian's passion for jazz, with the etched dancing shoes hinting at the delicate balance between their love and ambitions. Glass letters give it a modern, layered feel, reflecting the film's interplay of nostalgia and aspiration.`}
                    tools={projectTools}
                    date="Oct 2024"
                />

                <img  src="/img/graphic/lalaland/1.webp" alt="LALALAND full" className={styles.img} />
                <img  src="/img/graphic/lalaland/2.webp" alt="LALALAND vinyl" className={styles.img} />

                <section className={styles.horizontal} ref={horizontalRef}>
                    <div className={styles.content}>
                        <img src="/img/graphic/lalaland/slider1.webp" alt="LALALAND slider 1" className={styles.slider__img}/>
                    </div>

                    <div className={styles.content}>
                        <img src="/img/graphic/lalaland/slider2.webp" alt="LALALAND slider 2" className={styles.slider__img} />
                    </div>

                    <div className={styles.content}>
                        <img src="/img/graphic/lalaland/slider3.webp" alt="LALALAND slider 3" className={styles.slider__img}/>
                    </div>
                </section>

            </div>

            <Footer />
        </>
    )
}
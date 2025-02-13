import { useEffect, useRef, useState } from "react";
import HeaderArea from "@/components/HeadArea";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/ProjectHeader";
import MenuOverlay from "@/components/MenuOverlay";
import styles from "@/styles/Millenova.module.css";

export default function Millenova() {
    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];
    const horizontalRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

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
            <div className={styles.blendingMode}>
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
                    <img src="/img/graphic/millenova/2ver.webp" alt="Millenova versions" className={styles.img} />
                    <section className={styles.horizontal} ref={horizontalRef}>
                        <div className={styles.content}>
                            <img src="/img/graphic/millenova/slider1.webp" alt="Millenova slider 1" className={styles.slider__img}/>
                        </div>
                        <div className={styles.content}>
                            <img src="/img/graphic/millenova/slider2.webp" alt="Millenova slider 2" className={styles.slider__img}/>
                        </div>
                        <div className={styles.content}>
                            <img src="/img/graphic/millenova/slider3.webp" alt="Millenova slider 3" className={styles.slider__img}/>
                        </div>
                    </section>
                </div>
                
                <MenuOverlay />

                <Footer />
            </div>
        </>
    );
}

"use client"; // Ensures this runs only on the client side

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "@/styles/Beep.module.css";
import HeaderArea from "@/components/HeadArea";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectHeaderSC from "@/components/ProjectHeaderSC";
import VerticalSlider from "@/components/VerticalSlider";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

export default function Beep() {
    const projectTools = ["Product Designer", "Project Manager", "Front-end Developer"];

    // ✅ Horizontal Scroll Ref
    const horizontalRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    // ✅ Ensure all images are fully loaded before running GSAP
    useEffect(() => {
        if (typeof window === "undefined") return;

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

        if (imagesLoaded === images.length) setIsReady(true);
    }, []);

    // ✅ Horizontal Scroll Effect
    useEffect(() => {
        if (!isReady) return;

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
                ScrollTrigger.refresh();
            });
        });

        return () => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            });
        };
    }, [isReady]);

    // ✅ Text Animation Ref
    const textRef = useRef(null);

    // ✅ Fix GSAP ScrollTrigger for Text Animation
    useEffect(() => {
        gsap.config({ trialWarn: false });

        if (textRef.current) {
            const paragraphs = textRef.current.querySelectorAll("p");

            paragraphs.forEach((target) => {
                gsap.set(target, { willChange: "background-position" }); // Ensure smooth animation

                gsap.fromTo(
                    target,
                    { backgroundPositionX: "100%" }, // Start hidden
                    {
                        backgroundPositionX: "0%", // Reveal text
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: target,
                            markers: true, // REMOVE this in production
                            scrub: 1,
                            start: "top+=300px bottom", // Adjust start position
                            end: "top 50%", // End animation
                            toggleActions: "play reverse play reverse", // Play and reverse on scroll
                        },
                    }
                );
            });
        }

        ScrollTrigger.refresh(); // ✅ Ensures correct positioning after page load
    }, []);

    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Beep" description="Beep"/>
                <NavBar />

                <div className={styles.main}>
                    <ProjectHeaderSC
                        name="Beep" 
                        description="DEVELOPMENT / UX/UI / GRAPHIC DESIGN / BRANDING" 
                        img="/img/graphic/beep/beep-cover.png" 
                        introduction={`Beep is an AI-powered safety app designed to enhance personal security by providing real-time crime heat maps based on data from the Vancouver Police Department. The app features AI-guided safe route navigation, emergency alerts, loud alarms, and safe zone recommendations, ensuring users feel secure navigating urban environments.`}
                        tools={projectTools}
                        date="Sept–Dec 2024"
                    />

                    {/* ✅ Problem Section */}
                    <div className={styles.problem}>
                        <div className={styles.problem__state}>
                            <h1>the problem</h1>
                            <p>46% of women globally feel unsafe walking alone at night.</p>
                        </div>
                        <div className={styles.problem__gap}>
                            <h1>the gap</h1>
                            <p>Most safety apps focus on post-incident support, leaving users vulnerable in the moment. Manual inputs and lack of real-time data create delays when time is critical.</p>
                        </div>
                    </div>

                    {/* ✅ Horizontal Scroll Section */}
                    <div className={styles.solution}>
                        <div className={styles.problem__state}>
                            <section className={styles.horizontal} ref={horizontalRef}>
                                <div className={styles.content}>
                                    <p>It shouldn’t be like this.</p>
                                </div>
                                <div className={`${styles.content} ${styles.content__img}`}>
                                    <img src="/img/graphic/beep/solution-elements.png" alt="Beep solution" className={styles.solution__img} />
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* ✅ Beep Text Animation */}
                    <div className={styles.styleguide__font}>
                        <div className={styles.spacer}></div> 
                        <div className={styles.text} ref={textRef}>
                            <p>BEEEEEEEEEEEEEEEEEEEEEEEEEEE</p> 
                            <p>EP</p>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

import styles from '@/styles/Beep.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeaderSC from '@/components/ProjectHeaderSC';
import VerticalSlider from '@/components/VerticalSlider';
import { useState, useRef, useEffect } from 'react';

export default function Beep() {
    const projectTools = ["Product Designer", "Project Manager", "Front-end Developer"];

    const horizontalRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const comparisonSections = useRef([]);

    useEffect(() => {
        if (typeof window === "undefined") return; // Prevent SSR issues

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

    /** COMPARISON SLIDER */
    const [isComparisonReady, setIsComparisonReady] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const images = document.querySelectorAll("img");
        let loadedCount = 0;

        images.forEach((img) => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener("load", () => {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        setIsComparisonReady(true);
                    }
                });
            }
        });

        if (loadedCount === images.length) setIsComparisonReady(true);
    }, []);

    useEffect(() => {
        if (!isComparisonReady) return;

        import("gsap").then(({ default: gsap }) => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);

                comparisonSections.current.forEach((section, index) => {
                    if (!section) return; // Ensure the section exists before running animation

                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "center center",
                            end: "+=100%",
                            scrub: true,
                            pin: true,
                            anticipatePin: 1,
                            pinSpacing: true,
                        },
                        defaults: { ease: "power2.out", duration: 1.5 },
                    });

                    // ✅ Reveal first image
                    tl.fromTo(
                        section.querySelector(`.${styles.afterImage}`),
                        { clipPath: "inset(0 0 0 100%)" },
                        { clipPath: "inset(0 0 0 0%)" },
                        index * 0.75 // ✅ Progressive delay between sections
                    );

                    // ✅ Reveal second image (with slight delay)
                    tl.fromTo(
                        section.querySelector(`.${styles.thirdImage}`),
                        { clipPath: "inset(0 0 0 100%)" },
                        { clipPath: "inset(0 0 0 0%)" },
                        index * 1.5
                    );

                    ScrollTrigger.refresh();
                });
            });
        });

        return () => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            });
        };
    }, [isComparisonReady]);

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
                        introduction={`Beep is an AI-powered safety app designed to enhance personal security by providing real-time crime heat maps based on data from the Vancouver Police Department.`}
                        tools={projectTools}
                        date="Sept–Dec 2024"
                    />

                    <div className={styles.problem}>
                        <div className={styles.problem__state}>
                            <h1>the problem</h1>
                            <p>46% of women globally feel unsafe walking alone at night.</p>
                        </div>
                    </div>

                    <div className={styles.comparison}>
                        {/* FIRST COMPARISON SECTION */}
                        <section ref={(el) => (comparisonSections.current[0] = el)} className={styles.comparisonSection}>
                            <div className={`${styles.comparisonImage} ${styles.beforeImage}`}>
                                <img src="/img/graphic/beep/Lo-fi.png" alt="Beep Lo-fi Wireframes" />
                            </div>
                            <div className={`${styles.comparisonImage} ${styles.afterImage}`}>
                                <img src="/img/graphic/beep/Hi-fi.webp" alt="Beep Hi-fi Wireframes" />
                            </div>
                        </section>
                    </div>

                    {/* Business Card */}
                    <div className={styles.bisCard}>
                        <img src="/img/graphic/beep/bis-card.webp" alt="Beep business cards" />
                    </div>

                    {/* SECOND COMPARISON SECTION */}
                    <div className={styles.comparison}>
                        <section ref={(el) => (comparisonSections.current[1] = el)} className={styles.comparisonSection}>
                            <div className={`${styles.comparisonImage} ${styles.beforeImage}`}>
                                <img src="/img/graphic/beep/brochure-front.webp" alt="Brochure Front" />
                            </div>
                            <div className={`${styles.comparisonImage} ${styles.afterImage}`}>
                                <img src="/img/graphic/beep/brochure-back.webp" alt="Brochure Back" />
                            </div>
                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

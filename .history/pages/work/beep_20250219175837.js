import styles from '@/styles/Beep.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeaderSC from '@/components/ProjectHeaderSC';
import VerticalSlider from '@/components/VerticalSlider';
import ComparisonSlider from '@/components/ComparisonSlider';
import MenuOverlay from '@/components/MenuOverlay';
// import HiddenContent from '@/components/HiddenContent';
// import BeepText from '@/components/BeepText';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Beep() {
    const projectTools = ["Product Designer", "Project Manager", "Front-end Developer"];

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



    

    /** COMPARISON SLIDER */
    const comparisonSections = useRef([]);
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

                    // // ✅ Reveal first image
                    // tl.fromTo(
                    //     section.querySelector(`.${styles.afterImage}`),
                    //     { clipPath: "inset(0 0 0 100%)" },
                    //     { clipPath: "inset(0 0 0 0%)" },
                    //     index * 0.75 // ✅ Progressive delay between sections
                    // );

                    tl.fromTo(
                        section.querySelector(`.${styles.afterImage}`),
                        { clipPath: "inset(0 0 0 100%)" }, // Might be hiding it
                        { clipPath: "inset(0 0 0 0%)" }
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
                        introduction={`Beep is an AI-powered safety app designed to enhance personal security by providing real-time crime heat maps based on data from the Vancouver Police Department. The app features AI-guided safe route navigation, emergency alerts, loud alarms, and safe zone recommendations, ensuring users feel secure navigating urban environments. With seamless location sharing and instant emergency contact features, Beep sets a new standard in personal safety through innovative technology and local collaboration.`}
                        tools={projectTools}
                        date="Sept–Dec 2024"
                    />

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

                        <div className={styles.value}>
                            <img src="/img/graphic/beep/TN.webp" alt="Beep core values" />
                            <p>Beep empowers with Assurance, Action, and Trust. Proactively preventing danger, streamlining emergency help, and delivering reliable, real-time safety data.</p>
                        </div>
                    </div>
                        {/* <div>
                            <HiddenContent />
                        </div> */}

                        <div className={styles.userFlow}>
                            <img src="/img/graphic/beep/user-flow.png" alt="Beep user flow" />
                        </div>
                        
                        <div className={styles.persona}>
                            <VerticalSlider />
                        </div>

                        <div className={styles.styleguide}>
                            <img src="/img/graphic/beep/styleguide-1.png" alt="Beep styleguide 1" />
                        </div>

                        <div className={styles.styleguide__font}>
                            {/* <BeepText /> */}
                            <img src="/img/graphic/beep/Typography.png" alt="Beep typography" />
                        </div>

                        <div className={styles.mockup}>
                            <img src="/img/graphic/beep/Mockup.png" alt="Beep mockups" />
                        </div>

                        {/* FIRST COMPARISON SECTION */}
                        <section ref={(el) => (comparisonSections.current[0] = el)} className={styles.comparisonSection}>
                            <div className={`${styles.comparisonImage} ${styles.beforeImage}`}>
                                <img src="/img/graphic/beep/Lo-fi.png" alt="Beep Lo-fi Wireframes" />
                            </div>
                            <div className={`${styles.comparisonImage} ${styles.afterImage}`}>
                                <img src="/img/graphic/beep/Hi-fi.webp" alt="Beep Hi-fi Wireframes" />
                            </div>
                        </section>

                        <div className={styles.bisCard}>
                            <img src="/img/graphic/beep/bis-card.webp" alt="Beep business cards" />
                        </div>

                        {/* SECOND COMPARISON SECTION */}
                        <div className={styles.comparison}>
                            <section ref={(el) => (comparisonSections.current[1] = el)} className={styles.comparisonSection}>
                                <div className={`${styles.comparisonImageVer2} ${styles.beforeImage}`}>
                                    <img src="/img/graphic/beep/brochure-front.webp" alt="Brochure Front" />
                                </div>
                                <div className={`${styles.comparisonImageVer2} ${styles.afterImage}`}>
                                    <img src="/img/graphic/beep/brochure-back.webp" alt="Brochure Back" />
                                </div>
                            </section>
                        </div>
                </div>

                <MenuOverlay />
                

                <Footer />
            </div>
        </>
    )
}
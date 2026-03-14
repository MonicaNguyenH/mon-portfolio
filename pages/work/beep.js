import styles from '@/styles/Beep.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeaderSC2 from '@/components/ProjectHeaderSC2';
import VerticalSlider from '@/components/VerticalSlider';
import MenuOverlay from '@/components/MenuOverlay';
import HiddenContent from '@/components/HiddenContent';
import ScrollIndex from '@/components/ScrollIndex';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Beep() {
    const projectTools = ["Product Designer", "Project Manager", "Front-end Developer"];

    const horizontalRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    const mainRef = useRef(null);

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
                    x: -scrollWidth,
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
                    if (!section) return;
    
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "center center",
                            end: "+=100%",
                            scrub: index === 1 ? 3 : 2,
                            pin: true,
                            anticipatePin: 1,
                            pinSpacing: true,
                        },
                        defaults: { ease: "power2.out", duration: index === 1 ? 5.0 : 3.0 },
                    });
    
                    tl.fromTo(
                        section.querySelector(`.${styles.afterImage}`),
                        { clipPath: "inset(0 0 0 100%)" },
                        { clipPath: "inset(0 0 0 0%)" },
                        index * 10
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
                <ScrollIndex targetRef={mainRef} />

                <div className={styles.main} ref={mainRef}>
                    <ProjectHeaderSC2
                        name="Beep" 
                        description="DEVELOPMENT / UX/UI DESIGN / GRAPHIC DESIGN / BRANDING" 
                        img="/img/graphic/beep/beep-cover.png" 
                        introduction={`Beep is an AI-powered safety app designed to enhance personal security by providing real-time crime heat maps based on data from the Vancouver Police Department. The app features AI-guided safe route navigation, emergency alerts, loud alarms, and safe zone recommendations, ensuring users feel secure navigating urban environments. With seamless location sharing and instant emergency contact features, Beep sets a new standard in personal safety through innovative technology and local collaboration.`}
                        tools={projectTools}
                        date="Sept–Dec 2024"
                        buttonText1="Beep Blog" 
                        buttonLink1="https://beep-vlog.vercel.app"
                        buttonText2="Beep Prototype"
                        buttonLink2="https://www.figma.com/proto/7NT94Us1jQRtRqSwHE7LUR/Beep---Monica-Nguyen?node-id=6002-26808&p=f&t=IHtV2g6iCQJmMUWR-1&scaling=scale-down&content-scaling=fixed&page-id=6002%3A24562&starting-point-node-id=6002%3A26806"
                    />

                    <div className={styles.problem} id="problem">
                        <div className={styles.problem__state}>
                            <h1>the problem</h1>
                            <p>46% of women globally feel unsafe walking alone at night.</p>
                        </div>
                        <div className={styles.problem__gap}>
                            <h1>the gap</h1>
                            <p>Most safety apps focus on post-incident support, leaving users vulnerable in the moment. Manual inputs and lack of real-time data create delays when time is critical.</p>
                        </div>
                    </div>

                    <div className={styles.solution} id="solution">
                        <div className={styles.problem__state}>
                            <section className={styles.horizontal} ref={horizontalRef}>
                                <div className={styles.content}>
                                    <p>It shouldn't be like this.</p>
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

                    <div className={styles.overview} id="overview">
                        <HiddenContent 
                            imgFront="/img/graphic/beep/overview-2.png" 
                            imgBack="/img/graphic/beep/overview-1.png" 
                        />
                    </div>

                    <div className={styles.userFlow} id="user-flow">
                        <img src="/img/graphic/beep/user-flow.png" alt="Beep user flow" />
                    </div>
                    
                    <div className={styles.persona} id="persona">
                        <VerticalSlider />
                    </div>

                    <div className={styles.styleguide} id="styleguide">
                        <img src="/img/graphic/beep/styleguide-1.png" alt="Beep styleguide 1" />
                    </div>

                    <div className={styles.styleguide__font} id="typography">
                        <img src="/img/graphic/beep/Typography.png" alt="Beep typography" />
                    </div>

                    <div className={styles.mockup} id="mockup">
                        <img src="/img/graphic/beep/mockup.png" alt="Beep mockups" />
                    </div>

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

                    <section ref={(el) => (comparisonSections.current[1] = el)} className={styles.comparisonSection}>
                        <div className={`${styles.comparisonImageVer2} ${styles.beforeImage}`}>
                            <img src="/img/graphic/beep/brochure-front.webp" alt="Brochure Front" />
                        </div>
                        <div className={`${styles.comparisonImageVer2} ${styles.afterImage}`}>
                            <img src="/img/graphic/beep/brochure-back.webp" alt="Brochure Back" />
                        </div>
                    </section>
                </div>

                <MenuOverlay />
                <Footer />
            </div>
        </>
    )
}
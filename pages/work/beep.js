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
import ButtonFilledBlack from '@/components/ButtonFilledBlack';
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
                            scrub: 2,
                            pin: true,
                            anticipatePin: 1,
                            pinSpacing: true,
                        },
                        defaults: { ease: "power2.out", duration: 3.0 },
                    });
    
                    tl.fromTo(
                        section.querySelector(`.${styles.afterImage}`),
                        { clipPath: "inset(0 0 0 100%)" },
                        { clipPath: "inset(0 0 0 0%)" }
                    );
                });
    
                ScrollTrigger.refresh();
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

                    <div className={styles.overview} id="overview">
                        <HiddenContent 
                            imgFront="/img/graphic/beep/overview-2.png" 
                            imgBack="/img/graphic/beep/overview-1.png" 
                        />
                    </div>

                    <div className={styles.p1} id="P1">
                        <div className={styles.problem}>
                            <p className={styles.header}>
                                [01] <span className={styles.dash}>⸺</span> The Problem Space
                            </p>
                            <p className={styles.bodycopy}>
                                In a city like Vancouver, safety is a real part of how people move through public space, especially at night. While the city is often viewed as highly livable, public safety is not experienced the same way by everyone, or in every part of the city. The City of Vancouver reports that only 65% of adults agreed or strongly agreed that they felt safe walking alone in their neighbourhood at night. This finding would indicate that nearly half the population feels unsafe doing so. This tension becomes more relevant in and around downtown Vancouver. Foot traffic is dense, routes shift quickly, and decisions are often made in real time. Vancouver’s Downtown Public Space and Public Life work notes that people generally feel safe downtown. However, location and season affect how safe they feel, and that more can be done to improve the feeling of safety in public space.
                            </p>
                            <div className={styles.stats}>
                                <img src="/img/graphic/beep/stat-1.png" alt="Statistic 1" />
                                <img src="/img/graphic/beep/stat-2.png" alt="Statistic 2" />
                                <img src="/img/graphic/beep/stat-3.png" alt="Statistic 3" />
                            </div>
                            <p className={styles.bodycopy}>  
                                This matters because most navigation tools are built around speed and efficiency, while most safety tools focus on response after a threat has already escalated. In downtown Vancouver, where movement is dense and route decisions happen quickly, that gap becomes more visible. The Vancouver Police Department’s 2024 Q2 report showed that District 1, which covers the downtown peninsula, was the only patrol district with a year-to-date increase in violent crime. 
                            </p>
                        </div>

                        <div className={styles.solution}>
                            <img src="/img/graphic/beep/solution.png" alt="Beep introduction" />
                        </div>
                    </div>
                    
                    <div className={styles.p2} id="P2">
                        <div className={styles.headerSection}>
                            <p className={styles.header}>
                                [02] <span className={styles.dash}>⸺</span> Understanding the Landscape
                            </p>
                            <p className={styles.bodycopy}>
                                To understand how existing personal safety apps support users, I compared four competitors across their core safety features. The goal was to identify what the market already does well and where there was still room for Beep to offer a more proactive safety experience.
                            </p>
                        </div>

                        <div className={styles.tables}>
                            <p className={styles.tableHeader}>Table 1. Feature Comparison</p>
                            <img src="/img/graphic/beep/competitive-table-1.png" alt="Table 1. Feature Comparison" />

                            <p>
                                The comparison showed that most existing apps are strongest in emergency response, offering tools such as SOS alerts, live tracking, and evidence capture once a user already feels unsafe. Fewer products focus on helping users assess risk earlier through route guidance, area safety scoring, or real-time visibility that can support safer decisions before an incident happens.
                            </p>
                            <p>
                                To better understand this gap, I then looked beyond feature lists and examined what each competitor does well, where each one falls short, and what those gaps revealed as opportunities for Beep
                            </p>

                            <p className={styles.tableHeader}>Table 2. Market Gaps and Opportunity for Beep</p>
                            <img src="/img/graphic/beep/competitive-table-2.png" alt="Table 2. Market Gaps and Opportunity for Beep" />

                            <p> 
                                This analysis helped position Beep not as another emergency response app, but as a prevention-first tool designed to help users understand risk earlier and make safer route decisions with more confidence.
                            </p>
                        </div>
                        
                    </div>

                    <div className={styles.p3} id="P3">
                        <div className={styles.headerSection}>
                            <p className={styles.header}>
                                [03] <span className={styles.dash}>⸺</span> Turning Insight Into Product
                            </p>
                            <p className={styles.bodycopy}>
                                Research findings helped shape who Beep was designed for, what principles guided the experience, and how the core journey should work. Together, these decisions established the foundation for the product’s structure and direction.
                            </p>
                        </div>

                        <img src="/img/graphic/beep/core-values.webp" alt="Beep core values" />

                        <div className={styles.persona} id="persona">
                            <VerticalSlider />
                        </div>

                        <div className={styles.userFlow} id="user-flow">
                            <img src="/img/graphic/beep/user-flow.png" alt="Beep user flow" />
                        </div>
                    </div>

                    <div className={styles.p4} id="P4">
                        <div className={styles.headerSection}>
                            <p className={styles.header}>
                                [04] <span className={styles.dash}>⸺</span> Visual System
                            </p>
                            <p className={styles.bodycopy}>
                                A visual system was established early to define how Beep should look, feel, and communicate across the product. The goal was to create a direction that felt clear, reliable, and easy to navigate in a safety-focused context.
                            </p>
                        </div>

                        <div className={styles.styleguide}>
                            <img src="/img/graphic/beep/color-palette.png" alt="Beep styleguide 1" />
                        </div>

                        <div className={styles.styleguide__font}>
                            <img src="/img/graphic/beep/typography-1.png" alt="Beep typography" />
                            <img src="/img/graphic/beep/typography-2.png" alt="Beep typography" />
                        </div>
                    </div>

                    <div className={styles.p5} id="P5">
                        <div className={styles.headerSection}>
                            <p className={styles.header}>
                                [05] <span className={styles.dash}>⸺</span> Visual System
                            </p>
                            <p className={styles.bodycopy}>
                                A visual system was established early to define how Beep should look, feel, and communicate across the product. The goal was to create a direction that felt clear, reliable, and easy to navigate in a safety-focused context.
                            </p>
                        </div>

                        <section ref={(el) => (comparisonSections.current[0] = el)} className={styles.comparisonSection}>
                            <div className={`${styles.comparisonImage} ${styles.beforeImage}`}>
                                <img src="/img/graphic/beep/Lo-fi.png" alt="Beep Lo-fi Wireframes" />
                            </div>
                            <div className={`${styles.comparisonImage} ${styles.afterImage}`}>
                                <img src="/img/graphic/beep/Hi-fi.webp" alt="Beep Hi-fi Wireframes" />
                            </div>
                        </section>

                        <div className={styles.mockup}>
                            <img src="/img/graphic/beep/mockup.webp" alt="Beep mockups" />
                        </div>

                        <div className={styles.finalInterface}>
                            <img src="/img/graphic/beep/final-Interface.webp" alt="Beep Final Interface" />
                        </div>

                        {/* <div className={styles.figmaPrototype}>
                            <h1 className={styles.title}>BEEP PROTOTYPE</h1>
                            <div className={styles.prototypeStage}>
                                <div className={styles.restart}>
                                    <span class="restartLetter">R</span>
                                    <span class="restartText">Restart</span>
                                </div>
                                <div className={styles.phoneFrame}>
                                    <div className={styles.phoneProtoWrap}>
                                        <iframe
                                            src="https://embed.figma.com/proto/7NT94Us1jQRtRqSwHE7LUR/Beep---Monica-Nguyen?node-id=6002-26808&p=f&scaling=scale-down&content-scaling=fixed&page-id=6002%3A24562&starting-point-node-id=6002%3A26806&embed-host=share"
                                            allowFullScreen
                                            className={styles.phoneProto}
                                        />
                                    </div>
                                    <ButtonFilledBlack href="/work">
                                        Featured work
                                    </ButtonFilledBlack> 
                                </div>
                            </div>
                        </div> */}

                    </div>

                    <div className={styles.p6} id="p6">
                        <div className={styles.headerSection}>
                            <p className={styles.header}>
                                [06] <span className={styles.dash}>⸺</span> Beyond the App
                            </p>
                            <p className={styles.bodycopy}>
                            Beep was not limited to the mobile interface alone. To extend the product beyond the app itself, supporting touchpoints were developed across web, social, and print, creating a more cohesive identity and a clearer way to communicate the concept across different contexts.
                            </p>
                        </div>
                        <div className={styles.landingPage}>
                            <img src="/img/graphic/beep/landing.png" alt="Beep Landing Page" />
                        </div>
                        <div className={styles.landingPage}>
                            <img src="/img/graphic/beep/IG.webp" alt="Beep Instagram Page" />
                        </div>
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

                    
                    <div className={styles.p7} id="p7">
                        <div className={styles.headerSection}>
                            <p className={styles.header}>
                                [07] <span className={styles.dash}>⸺</span> Outcome & Reflection
                            </p>
                        </div>
                        <div className={styles.photoWDescription}>
                            <img src="/img/graphic/beep/D3-FSWD.webp" alt="D3/FSWD" />
                            <p>D3 / FSWD Annual Student Design & Technology Showcase</p>
                        </div>

                        <p className={styles.description}>
                            We presented Beep at the D3 / FSWD Annual Student Design & Technology Showcase on December 6, 2024, an event centered on innovative digital solutions that address real-world challenges through artificial intelligence, with a focus on supporting underrepresented and underserved communities. The project was awarded third place, marking Beep as one of the standout concepts presented at the showcase. For us, it was an opportunity to present a project grounded in a problem that felt immediate, relevant, and deeply human.
                            <br /><br />
                            From a very early stage, the project came with real challenges. We ran into issues with AI training, production constraints, and timing, especially as the showcase drew closer. Going into the project, I expected to learn more about working closely with developers on a larger-scale product. What I did not expect was how much I would learn about taking decisive action, carrying a project through multiple iterations, and pushing it toward a more complete and marketable outcome under pressure. More than anything, the process taught me how to respond when things do not go as planned, how to keep moving when deadlines tighten, and how to work through complexity within a diverse team setting. That experience was demanding, but it was also one of the most valuable parts of the project.
                        </p>
                        
                        <div className={styles.photoWDescription} id={styles.teamPhoto}>
                            <img src="/img/graphic/beep/beep-team.webp" alt="Beep team" />
                            <p>The Beep team</p>
                        </div>

                        <p className={styles.description}>
                            As Beep developed, one thing became increasingly clear to our team. Safety is not a distant or abstract concern. It shapes everyday decisions in immediate and often deeply personal ways. As a predominantly women-led team, many of us shared similar experiences and concerns around personal safety, particularly in public spaces. That perspective gave the project a strong and honest starting point. At the same time, as the idea evolved into a product, it became clear that Beep should speak to something broader. While those concerns helped shape its foundation, the purpose of Beep extends beyond any one group. It is built for anyone who values safety and believes that feeling secure should not be treated as a privilege, but as something everyone deserves.
                            <br /><br />
                            Beyond the project itself, we hoped Beep would represent more than a functional application. It became a way of asking how technology might be directed more intentionally toward everyday challenges that are often normalized, overlooked, or left to individuals to manage on their own. For me, the project reinforced the idea that digital products can do more than provide utility. At their best, they can respond to lived realities with clarity, care, and purpose. That belief continues to shape the kind of work I want to create.   
                        </p>

                        <div className={styles.photoWDescription}>
                            <img src="/img/graphic/beep/BCIT-D3.webp" alt="Beep team" />
                            <p>D3 / FSWD Annual Student Design & Technology Showcase</p>
                        </div>

                        <p className={styles.description}>
                            I would especially like to thank my teammate Jumi Pham, who worked closely with me across both the design and marketing sides of the project. Her collaboration, support, and sense of humor made the process lighter even during the most difficult moments. I am also deeply grateful to the entire Beep team and to the BCIT professors in my program for making this project such a meaningful part of my early professional growth.   
                        </p>
                    </div>
                    <div className={styles.igLetter}>
                            <img src="/img/graphic/beep/beep-letter.webp" alt="Beep team" />
                    </div>



                    
                    

                    {/* <section ref={(el) => (comparisonSections.current[1] = el)} className={styles.comparisonSection}>
                            <div className={`${styles.comparisonImageVer2} ${styles.beforeImage}`}>
                                <img src="/img/graphic/beep/brochure-front.webp" alt="Brochure Front" />
                            </div>
                            <div className={`${styles.comparisonImageVer2} ${styles.afterImage}`}>
                                <img src="/img/graphic/beep/brochure-back.webp" alt="Brochure Back" />
                            </div>
                    </section> */}


                    

                    {/* <section ref={(el) => (comparisonSections.current[0] = el)} className={styles.comparisonSection}>
                        <div className={`${styles.comparisonImage} ${styles.beforeImage}`}>
                            <img src="/img/graphic/beep/Lo-fi.png" alt="Beep Lo-fi Wireframes" />
                        </div>
                        <div className={`${styles.comparisonImage} ${styles.afterImage}`}>
                            <img src="/img/graphic/beep/Hi-fi.webp" alt="Beep Hi-fi Wireframes" />
                        </div>
                    </section> */}


                    {/* <section ref={(el) => (comparisonSections.current[1] = el)} className={styles.comparisonSection}>
                        <div className={`${styles.comparisonImageVer2} ${styles.beforeImage}`}>
                            <img src="/img/graphic/beep/brochure-front.webp" alt="Brochure Front" />
                        </div>
                        <div className={`${styles.comparisonImageVer2} ${styles.afterImage}`}>
                            <img src="/img/graphic/beep/brochure-back.webp" alt="Brochure Back" />
                        </div>
                    </section> */}
                </div>

                <MenuOverlay />
                <Footer />
            </div>
        </>
    )
}
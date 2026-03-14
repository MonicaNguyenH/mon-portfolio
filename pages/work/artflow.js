import styles from '@/styles/Artflow.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import MenuOverlay from "@/components/MenuOverlay";
import { useState, useRef, useEffect } from 'react';
import Footer from '@/components/Footer';
import ProjectHeaderSC2 from '@/components/ProjectHeaderSC2';

export default function Artflow() {
    const projectTools = ["Figma", "Next.js", "Adobe Photoshop", "Adobe Illustrator"];

    const scrollTextRef = useRef(null);
    const mainSectionRef = useRef(null);
    const [gsapInstance, setGsapInstance] = useState(null);

    useEffect(() => {
        let gsap, ScrollTrigger;
    
        import("gsap").then(({ default: loadedGsap }) => {
            gsap = loadedGsap;
            import("gsap/ScrollTrigger").then(({ ScrollTrigger: loadedScrollTrigger }) => {
                ScrollTrigger = loadedScrollTrigger;
                gsap.registerPlugin(ScrollTrigger);
                setGsapInstance(gsap);
    
                if (scrollTextRef.current) {
                    const scrollableTextLength = scrollTextRef.current.scrollWidth;
    
                    const scrollTextTl = gsap.timeline({ paused: true })
                        .to(scrollTextRef.current, {
                            translateX: -scrollableTextLength + 1000,
                            ease: "none",
                        });
    
                    ScrollTrigger.create({
                        animation: scrollTextTl,
                        trigger: mainSectionRef.current,
                        start: "top top",
                        end: `+=${scrollableTextLength}`,
                        scrub: 0.1,
                        pin: true,
                        pinSpacing: true,
                    });
                }
    
                // ✅ Fade in text smoothly on scroll
                gsap.fromTo(
                    scrollTextRef.current,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: scrollTextRef.current,
                            start: "top 85%",
                            end: "top 50%",
                            scrub: true,
                        },
                    }
                );
    
                // ✅ Fade in images properly
                gsap.utils.toArray(`.${styles.img} img`).forEach((img) => {
                    gsap.fromTo(
                        img,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1.2,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: img,
                                start: "top 90%",
                                end: "top 60%",
                                scrub: true,
                            },
                        }
                    );
                });
    
                // 🛠 Refresh ScrollTrigger to fix early animation issue
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 500); // Delay refresh to ensure layout settles
    
            });
        });
    
        return () => {
            if (gsapInstance) {
                gsapInstance.globalTimeline.clear();
            }
        };
    }, []);
    

    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Artflow" description="Artflow"/>

                <NavBar />

                <div className={styles.main}>
                    <ProjectHeaderSC2
                        name="Artflow" 
                        description="DEVELOPMENT / UX/UI DESIGN" 
                        img="/img/graphic/artflow/cover.webp" 
                        introduction={`ArtFlow is a digital art app designed for anyone who wants to create, whether you're just starting or already experienced. It features an easy-to-use drawing canvas, AI-generated prompts to spark ideas, and a habit tracker to help you stay consistent. You can share your artwork with friends through built-in messaging and keep track of your progress on your profile page. With a simple interface and smart tools, ArtFlow makes drawing and creativity more fun, accessible, and organized.`}
                        tools={projectTools}
                        date="Jan–May 2024"
                        buttonText1="Artflow Prototype" 
                        buttonLink1="https://www.figma.com/proto/F0oEWQeN0snreUcpZYsyCA/ArtFlow---Monica-Nguyen?node-id=2642-3521&p=f&t=bNcxVNV91buGSV3V-1&scaling=scale-down&content-scaling=fixed&page-id=2642%3A2023&starting-point-node-id=2642%3A3521"
                        buttonText2="Artflow app" 
                        buttonLink2="https://artflow-d3.vercel.app/"
                    />

                    <div className={styles.logo}>
                        <img src="/img/graphic/artflow/logo.png" alt="Artflow logo" />
                    </div>

                    <div className={styles.color}>
                        <img src="/img/graphic/artflow/color.webp" alt="Artflow color palette" />
                    </div>

                    <div className={styles.typography}>
                        <img src="/img/graphic/artflow/typo.png" alt="Artflow typography" />
                    </div>

                    <div className={styles.fullscreen} ref={mainSectionRef}>
                        <div className={styles.container}>
                            <h1 ref={scrollTextRef} className={styles.scrollableText}>
                                <span className={styles.pinkText}>Art</span>&nbsp;is the only way to run away without leaving home
                                <span className={styles.img}>
                                    <img src="/img/graphic/artflow/1.webp" alt="Artflow screen 1" />
                                    {/* <img src="/img/graphic/artflow/2.webp" alt="Artflow screen 2" /> */}
                                </span>
                                <span className={styles.img}>
                                    <img src="/img/graphic/artflow/2.webp" alt="Artflow screen 2" />
                                </span>
                                <span className={styles.img}>
                                    <img src="/img/graphic/artflow/3.webp" alt="Artflow screen 3" />
                                </span>
                                <span className={styles.img}>
                                    <img src="/img/graphic/artflow/4.webp" alt="Artflow screen 4" />
                                </span>
                                <span className={styles.img}>
                                    <img src="/img/graphic/artflow/5.webp" alt="Artflow screen 5" />
                                </span>
                                <span className={styles.img}>
                                    <img src="/img/graphic/artflow/6.webp" alt="Artflow screen 6" />
                                </span>
                                <span className={styles.img}>
                                    <img src="/img/graphic/artflow/7.webp" alt="Artflow screen 7" />
                                </span>
                                <span className={styles.img}>
                                    <img src="/img/graphic/artflow/8.webp" alt="Artflow screen 8" />
                                </span>
                                <span className={styles.img}>
                                    <img src="/img/graphic/artflow/9.webp" alt="Artflow screen 9" />
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>

                <MenuOverlay />

                <Footer />
            </div>
        </>
    )
}
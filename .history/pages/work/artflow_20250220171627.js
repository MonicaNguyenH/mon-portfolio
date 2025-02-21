import styles from '@/styles/Artflow.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import ProjectHeaderSC from '@/components/ProjectHeaderSC';
import MenuOverlay from "@/components/MenuOverlay";
import { useState, useRef, useEffect } from 'react';

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
                    <ProjectHeaderSC
                        name="Artflow" 
                        description="DEVELOPMENT / UX/UI DESIGN" 
                        img="/img/graphic/artflow/cover.webp" 
                        introduction={`ArtFlow is a digital art app designed for anyone who wants to create, whether you're just starting or already experienced. It features an easy-to-use drawing canvas, AI-generated prompts to spark ideas, and a habit tracker to help you stay consistent. You can share your artwork with friends through built-in messaging and keep track of your progress on your profile page. With a simple interface and smart tools, ArtFlow makes drawing and creativity more fun, accessible, and organized.`}
                        tools={projectTools}
                        date="Jan–May 2024"
                        buttonText="Artflow app" 
                        buttonLink="https://artflow-d3.vercel.app/"
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
                                        <img src="/img/graphic/artflow/2.webp" alt="Artflow screen 2" />
                                    </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
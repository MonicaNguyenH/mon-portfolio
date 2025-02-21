"use client";

import styles from '@/styles/Artflow.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import ProjectHeaderSC from '@/components/ProjectHeaderSC';
import { useState, useRef, useEffect } from 'react';

export default function Artflow() {
    const projectTools = ["Figma", "Next.js", "Adobe Photoshop", "Adobe Illustrator"];

    const scrollTextRef = useRef(null);
    const mainSectionRef = useRef(null);
    const imagesRef = useRef([]);
    const [gsapInstance, setGsapInstance] = useState(null);

    useEffect(() => {
        let gsap, ScrollTrigger;

        import("gsap").then(({ default: loadedGsap }) => {
            gsap = loadedGsap;
            import("gsap/ScrollTrigger").then(({ ScrollTrigger: loadedScrollTrigger }) => {
                ScrollTrigger = loadedScrollTrigger;
                gsap.registerPlugin(ScrollTrigger);
                setGsapInstance(gsap);

                // Horizontal scroll animation
                if (scrollTextRef.current) {
                    const scrollableTextLength = scrollTextRef.current.scrollWidth;

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: mainSectionRef.current,
                            start: "top top",
                            end: `+=${scrollableTextLength}`,
                            scrub: 0.1,
                            pin: true,
                            pinSpacing: true,
                        }
                    }).to(scrollTextRef.current, {
                        translateX: -scrollableTextLength + 1000,
                        ease: "none",
                    });
                }

                // Reveal animation for images
                imagesRef.current.forEach((img, i) => {
                    gsap.fromTo(img, 
                        { opacity: 0, y: 50 }, 
                        { opacity: 1, y: 0, duration: 1, ease: "power2.out",
                          scrollTrigger: {
                              trigger: img,
                              start: "top 80%",
                              toggleActions: "play none none reverse",
                          }
                        }
                    );
                });

                // Reveal animation for text
                gsap.fromTo(scrollTextRef.current, 
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
                      scrollTrigger: {
                          trigger: scrollTextRef.current,
                          start: "top 85%",
                          toggleActions: "play none none reverse",
                      }
                    }
                );
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
                        <img src="/img/graphic/artflow/logo.png" alt="Artflow logo" ref={(el) => imagesRef.current[0] = el} />
                    </div>

                    <div className={styles.color}>
                        <img src="/img/graphic/artflow/color.webp" alt="Artflow color palette" ref={(el) => imagesRef.current[1] = el} />
                    </div>

                    <div className={styles.typography}>
                        <img src="/img/graphic/artflow/typo.png" alt="Artflow typography" ref={(el) => imagesRef.current[2] = el} />
                    </div>

                    <div className={styles.fullscreen} ref={mainSectionRef}>
                        <div className={styles.container}>
                            <h1 ref={scrollTextRef} className={styles.scrollableText}>
                                <span className={styles.pinkText}>Art</span>&nbsp;is the only way to run away without leaving home
                                {[...Array(9)].map((_, i) => (
                                    <span key={i} className={styles.img}>
                                        <img 
                                            src={`/img/graphic/artflow/${i + 1}.webp`} 
                                            alt={`Artflow screen ${i + 1}`} 
                                            ref={(el) => imagesRef.current[i + 3] = el} 
                                        />
                                    </span>
                                ))}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

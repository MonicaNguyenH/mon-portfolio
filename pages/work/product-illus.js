import { useState, useRef, useEffect } from 'react';
import styles from '@/styles/ProductIllus.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/ProjectHeader';
import MenuOverlay from '@/components/MenuOverlay';
import MagnifyingGlass from '@/components/MagnifyingGlass';

export default function ProductIllus() {
    const projectTools = ["Adobe Illustrator"];

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
                <HeaderArea title="Product Illus." description="Product Illus." />
                <NavBar />
                <div className={styles.main}>
                    <ProjectHeader
                        name="Product Illus."
                        description="GRAPHIC DESIGN"
                        img="/img/graphic/object/cover.webp"
                        introduction={`Product Illus. is a product-focused vector study recreated from a reference photo in Adobe Illustrator. The cassette deck is constructed from simple geometry, then refined with accurate proportions, layered shading, and color to achieve a polished, realistic finish. Attention to small details like highlights, depth, and material texture helps the illustration feel dimensional rather than flat. A pink to blue gradient accent adds brand consistency and visual impact.`}
                        tools={projectTools}
                        date="Nov 2023"
                    />
                </div>

                <div className={styles.comparison}>
                    <section ref={(el) => (comparisonSections.current[0] = el)} className={styles.comparisonSection}>
                        <div className={`${styles.comparisonImage} ${styles.beforeImage}`}>
                            <img src="/img/graphic/object/eg.jpg" alt="Object stock img" />
                        </div>
                        <div className={`${styles.comparisonImage} ${styles.afterImage}`}>
                            <img src="/img/graphic/object/vector.jpg" alt="Object vertor illustration" />
                        </div>
                    </section>
                </div>

                {/* Full viewport magnifier section */}
                <div className={styles.magnifierSection}>           
                    <MagnifyingGlass
                        src="/img/graphic/object/vector.webp"
                        alt="Vector illustration magnified view"
                        zoomLevel={3}
                        magnifierSize={300}
                    />
                </div>

                <MenuOverlay />
                
                <Footer />
            </div>
        </>
    )
}
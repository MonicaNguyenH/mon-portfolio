import { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Forelsket.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/ProjectHeader';

export default function Forelsket() {
    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];
    const [lightboxImage, setLightboxImage] = useState(null); // Track the lightbox image
    const [isHovering, setIsHovering] = useState(false); // Track hover state
    const cursorRef = useRef(null); // Ref for the custom cursor

    // Open lightbox
    const openLightbox = (src) => {
        setLightboxImage(src);
    };

    // Close lightbox
    const closeLightbox = () => {
        setLightboxImage(null);
    };

    // Handle mouse move for custom cursor
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Forelsket" description="Forelsket" />

                <NavBar />

                <div className={styles.main}>
                    <ProjectHeader
                        name="Forelsket"
                        description="GRAPHIC DESIGN"
                        img="/img/graphic/menu/cover.webp"
                        introduction={`Forelsket brunch menu design combines bold typography with a red-dominant color scheme, creating a visually stimulating layout that enhances appetite and readability. Photocopy-style textures add depth to ingredient visuals, while oversized type effectively separates sections like Savories, Kids, and Drinks for seamless navigation. The structured yet dynamic design reinforces the restaurant’s bold, modern identity while making the dining experience both engaging and intuitive.`}
                        tools={projectTools}
                        date="May 2024"
                    />

                    <div className={styles.menu}>
                        {['/img/graphic/menu/menu-1.webp', '/img/graphic/menu/menu-2.webp', '/img/graphic/menu/menu-3.webp'].map((src, index) => (
                            <div
                                key={index}
                                className={styles.img}
                                onClick={() => openLightbox(src)}
                                onMouseEnter={() => setIsHovering(true)} // Handle hover in
                                onMouseLeave={() => setIsHovering(false)} // Handle hover out
                            >
                                <img src={src} alt={`Forelsket Menu ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lightbox */}
                {lightboxImage && (
                    <div className={styles.lightbox} onClick={closeLightbox}>
                        <img src={lightboxImage} alt="Lightbox" />
                    </div>
                )}

                {/* Custom Cursor */}
                {isHovering && (
                    <div ref={cursorRef} className={styles.customCursor}>
                        [view]
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}
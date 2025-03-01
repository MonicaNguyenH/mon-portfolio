import { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Forelsket.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/ProjectHeader';

export default function Forelsket() {
    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];
    const [lightboxImage, setLightboxImage] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
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
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        const speed = 0.1; // (lower = smoother/slower)
    
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
    
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
    
            if (cursorRef.current) {
                cursorRef.current.style.left = `${cursorX}px`;
                cursorRef.current.style.top = `${cursorY}px`;
            }
    
            requestAnimationFrame(animateCursor);
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        requestAnimationFrame(animateCursor);
    
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
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
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
                <div ref={cursorRef} className={`${styles.customCursor} ${isHovering ? styles.visible : ''}`}>
                    {isHovering && <p>[view]</p>}
                </div>

                <Footer />
            </div>
        </>
    );
}

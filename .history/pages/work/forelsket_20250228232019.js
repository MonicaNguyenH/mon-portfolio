import { useState } from 'react';
import styles from '@/styles/Forelsket.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/ProjectHeader';

export default function Forelsket() {
    const [lightboxImg, setLightboxImg] = useState(null);

    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];

    const handleImgClick = (src) => {
        setLightboxImg(src);
    };

    const handleLightboxClose = (e) => {
        if (e.target.classList.contains(styles.lightbox)) {
            setLightboxImg(null);
        }
    };

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
                        {["/img/graphic/menu/menu-1.webp", "/img/graphic/menu/menu-2.webp", "/img/graphic/menu/menu-3.webp"].map((src, index) => (
                            <div className={styles.img} key={index} onClick={() => handleImgClick(src)}>
                                <img src={src} alt={`Forelsket Menu ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>

            {lightboxImg && (
                <div className={`${styles.lightbox} ${styles.show}`} onClick={handleLightboxClose}>
                    <img src={lightboxImg} alt="Lightbox" />
                </div>
            )}
        </>
    );
}
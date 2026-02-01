import { useState, useRef, useEffect } from 'react';
import styles from '@/styles/Starfruit.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/ProjectHeader';
import MenuOverlay from '@/components/MenuOverlay';

export default function Starfruit() {
    const projectTools = ["Procreate", "Figma"];

    return (
        <>
        <div className={styles.blendingMode}>
                <HeaderArea title="The Starfruit Tree" description="The Starfruit Tree" />
                <NavBar />
                <div className={styles.main}>
                    <ProjectHeader
                        name="The Starfruit Tree"
                        description="GRAPHIC DESIGN"
                        img="/img/graphic/starfruit/cover.webp"
                        introduction={`Product Illus. is a product-focused vector study recreated from a reference photo in Adobe Illustrator. The cassette deck is constructed from simple geometry, then refined with accurate proportions, layered shading, and color to achieve a polished, realistic finish. Attention to small details like highlights, depth, and material texture helps the illustration feel dimensional rather than flat. A pink to blue gradient accent adds brand consistency and visual impact.`}
                        tools={projectTools}
                        date="Dec 2024"
                    />
                </div>

                <div>
                <iframe width="800" height="450" src="https://embed.figma.com/proto/0w1WpGdSFuZQ5iS5OPdjAW/The-Starfruit-Tree---Jumi---Monica--Copy-?node-id=72-2426&p=f&scaling=contain&content-scaling=fixed&page-id=72%3A886&starting-point-node-id=72%3A887&embed-host=share" allowfullscreen></iframe>
                </div>

                <MenuOverlay />

                <Footer />
        </div>
        </>
    )
}
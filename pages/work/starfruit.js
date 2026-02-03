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
                        name="Starfruit Tree"
                        description="GRAPHIC DESIGN"
                        img="/img/graphic/starfruit/cover.webp"
                        introduction=
                        {<>
                            Starfruit Tree Interactive Book is a collaborative digital storybook based on the Vietnamese folktale The Starfruit Tree{" "}
                            <span className={styles.vn}>(Sự tích cây khế)</span>. The project uses a childlike, comic-inspired illustration style to keep the story approachable and playful, while the color palette balances muted, earthy tones with brighter accents to evoke a rustic, old Vietnam feel without losing energy. Simple interactive navigation and on-screen text support an easy reading flow and an engaging page-by-page experience.
                        </>}
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
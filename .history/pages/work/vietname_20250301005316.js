import styles from '@/styles/Vietname.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/ProjectHeader';
import MenuOverlay from '@/components/MenuOverlay';

export default function Vietname() {
    const projectTools = ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator"];

    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Vietname" description="Vietname"/>

                <NavBar />

                <div className={styles.main}>
                <ProjectHeader 
                    name="Vietname" 
                    description="GRAPHIC DESIGN" 
                    img="/img/graphic/vietname/cover-big.webp" 
                    introduction={`Vietname is a digital and print magazine celebrating Vietnam’s enduring architectural and cultural heritage. Through a refined blend of traditional aesthetics and modern minimalism, the magazine showcases iconic landmarks like the One Pillar Pagoda, Hoi An Japanese Bridge, and Hue Imperial City. The digital edition enhances the experience with interactive elements, offering readers a deeper exploration of Vietnam’s rich architectural legacy.`}
                    tools={projectTools}
                    date="Jan 2024"
                />

                </div>

                <MenuOverlay />

                <Footer />
            </div>
        </>
    )
}
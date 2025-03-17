import styles from '@/styles/Vietname.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/ProjectHeader';
import MenuOverlay from '@/components/MenuOverlay';
import ProjectHeaderSC2 from '@/components/ProjectHeaderSC2';

export default function Vietname() {
    const projectTools = ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator"];

    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Vietname" description="Vietname"/>

                <NavBar />

                <div className={styles.main}>
                    <ProjectHeaderSC2
                        name="Vietname" 
                        description="GRAPHIC DESIGN" 
                        img="/img/graphic/vietname/cover-big.webp" 
                        introduction={`Vietname is a digital and print magazine celebrating Vietnam’s enduring architectural and cultural heritage. Through a refined blend of traditional aesthetics and modern minimalism, the magazine showcases iconic landmarks like the One Pillar Pagoda, Hoi An Japanese Bridge, and Hue Imperial City. The digital edition enhances the experience with interactive elements, offering readers a deeper exploration of Vietnam’s rich architectural legacy.`}
                        tools={projectTools}
                        date="Oct 2024"
                        buttonText1="Vietname Print" 
                        buttonLink1="https://indd.adobe.com/view/19d8db63-f0f1-4e54-afff-fe361cc00186"
                        buttonText2="Vietname Digital" 
                        buttonLink2="https://indd.adobe.com/view/19d8db63-f0f1-4e54-afff-fe361cc00186"
                    />

                    <div className={styles.embedded}>
                        <div className={styles.print}>
                            <div className={styles.print__content}>
                                <iframe className={styles.indesign__print} src="https://indd.adobe.com/embed/cab41585-505e-4441-9fb6-541fd30ed968?startpage=1&allowFullscreen=true" frameborder="0" allowfullscreen=""></iframe> 
                                {/* <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/cab41585-505e-4441-9fb6-541fd30ed968?startpage=1&allowFullscreen=true" width="525px" height="371px" frameborder="0" allowfullscreen=""></iframe> */}
                                <p className={styles.descText}>Print Version</p>
                            </div>
                        </div>

                        <div className={styles.digital}>
                            <div className={styles.digital__content}>
                                <iframe className={styles.indesign__print} src="https://indd.adobe.com/embed/082cc578-f77b-40c5-bf38-014d56fe7e8e?startpage=1&allowFullscreen=true" width={525} height={371} frameborder="0" allowfullscreen=""></iframe> 
                                {/* <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/082cc578-f77b-40c5-bf38-014d56fe7e8e?startpage=1&allowFullscreen=true" width="525px" height="371px" frameborder="0" allowfullscreen=""></iframe> */}
                                <p className={styles.descText}>Digital Version</p>
                            </div>
                        </div>
                    </div>

                </div>

                <MenuOverlay />

                <Footer />
            </div>
        </>
    )
}
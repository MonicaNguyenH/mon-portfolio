import styles from '@/styles/Beep.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/ProjectHeader';

export default function Beep() {
    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Beep" description="Beep"/>

                <NavBar />

                <div className={styles.main}>
                    <ProjectHeader 
                        name="Beep" 
                        description="DEVELOPMENT / UX/UI / GRAPHIC DESIGN / BRANDING" 
                        img="/img/graphic/lalaland/cover.webp" 
                        introduction={`This La La Land poster captures the heart of the film through thoughtful symbolism. The gradient draws from the iconic "A Lovely Night" dance scene, blending dusk and dreams. The vinyl record represents Sebastian's passion for jazz, with the etched dancing shoes hinting at the delicate balance between their love and ambitions. Glass letters give it a modern, layered feel, reflecting the film's interplay of nostalgia and aspiration.`}
                        tools={projectTools}
                        date="Oct 2024"
                    />


                </div>

                <Footer />
            </div>
        </>
    )
}
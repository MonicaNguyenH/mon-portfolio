import styles from '@/styles/Addicted.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/ProjectHeader';
import VideoPlayer from '@/components/VideoPlayer';


export default function Addicted() {
    const projectTools = ["After Effects", "Adobe Illustrator"];

    return (
        <> 
            <div className={styles.blendingMode}>
                <HeaderArea title="Addicted" description="Addicted"/>
                <NavBar />

                <div className={styles.main}>
                    <ProjectHeader 
                        name="Addiction" 
                        description="MOTION GRAPHIC" 
                        img="/img/graphic/addict/TN.webp" 
                        introduction={`Addicted is a motion graphic exploring the cycle of prescription drug addiction through minimalist visuals and smooth transitions. It follows a character's journey from a bike accident to opioid dependence, using metaphorical storytelling and fluid animation to simplify complex medical concepts into an engaging visual narrative.`}
                        tools={projectTools}
                        date="Oct 2024"
                    />

                    <div className={styles.video}>
                        <VideoPlayer />
                    </div>
                </div>

                <Footer />
            </div>
 
        </>
    )
}
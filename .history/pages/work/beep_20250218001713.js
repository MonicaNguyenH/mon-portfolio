import styles from '@/styles/Beep.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeaderSC from '@/components/ProjectHeaderSC';

export default function Beep() {
    const projectTools = ["Product Designer", "Project Manager", "Front-end Developer"];

    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Beep" description="Beep"/>

                <NavBar />

                <div className={styles.main}>
                    <ProjectHeaderSC
                        name="Beep" 
                        description="DEVELOPMENT / UX/UI / GRAPHIC DESIGN / BRANDING" 
                        img="/img/graphic/beep/beep-cover.png" 
                        introduction={`Beep is an AI-powered safety app designed to enhance personal security by providing real-time crime heat maps based on data from the Vancouver Police Department. The app features AI-guided safe route navigation, emergency alerts, loud alarms, and safe zone recommendations, ensuring users feel secure navigating urban environments. With seamless location sharing and instant emergency contact features, Beep sets a new standard in personal safety through innovative technology and local collaboration.`}
                        tools={projectTools}
                        date="Sept–Dec 2024"
                    />

                    <div className={styles.problem}>
                        <div className={styles.problem__state}>
                            <h1>the problem</h1>
                            <p>46% of women globally feel unsafe walking alone at night.</p>
                        </div>
                        <div className={styles.problem__gap}>
                            <h1>the problem</h1>
                            <p>46% of women globally feel unsafe walking alone at night.</p>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}
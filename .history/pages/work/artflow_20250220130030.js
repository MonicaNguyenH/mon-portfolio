import styles from '@/styles/Artflow.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import MenuOverlay from "@/components/MenuOverlay";

export default function Artflow() {
    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Artflow" description="Artflow"/>

                <NavBar />

                <div className={styles.main}>
                    <ProjectHeaderSC
                        name="Artflow" 
                        description="DEVELOPMENT / UX/UI" 
                        img="/img/graphic/beep/beep-cover.png" 
                        introduction={`Beep is an AI-powered safety app designed to enhance personal security by providing real-time crime heat maps based on data from the Vancouver Police Department. The app features AI-guided safe route navigation, emergency alerts, loud alarms, and safe zone recommendations, ensuring users feel secure navigating urban environments. With seamless location sharing and instant emergency contact features, Beep sets a new standard in personal safety through innovative technology and local collaboration.`}
                        tools={projectTools}
                        date="Sept–Dec 2024"
                    />
                </div>
            </div>
        </>
    )
}
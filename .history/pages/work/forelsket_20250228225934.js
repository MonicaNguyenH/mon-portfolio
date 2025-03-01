import styles from '@/styles/Forelsket.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProjectHeader from '@/components/ProjectHeader';

export default function Forelsket () {
    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];

    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Forelsket" description="Forelsket"/>

                <NavBar />

                <div className={styles.main}>
                    <ProjectHeader 
                        name="Forelsket" 
                        description="GRAPHIC DESIGN" 
                        img="/img/graphic/menu/TN.png" 
                        introduction={`Forelsket brunch menu design combines bold typography with a red-dominant color scheme, creating a visually stimulating layout that enhances appetite and readability. Photocopy-style textures add depth to ingredient visuals, while oversized type effectively separates sections like Savories, Kids, and Drinks for seamless navigation. The structured yet dynamic design reinforces the restaurant’s bold, modern identity while making the dining experience both engaging and intuitive.`}
                        tools={projectTools}
                        date="May 2024"
                    />
                </div>

                <Footer />
            </div>
        </>
    )
}
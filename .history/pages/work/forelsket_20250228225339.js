import styles from '@/styles/Forelsket.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Forelsket () {
    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];

    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Forelsket" description="Forelsket"/>

                <NavBar />

                <div className={styles.main}>

                </div>

                <Footer />
            </div>
        </>
    )
}
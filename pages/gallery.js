import styles from '@/styles/Gallery.module.css';
import HeaderArea from "@/components/HeadArea";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LightBox from '@/components/LightBox';


export default function Gallery () {
    return (
        <>
            <HeaderArea title="Gallery" description="Gallery"/>
            <div className={styles.blendingMode}>
                <NavBar />

                <div className={styles.main}>
                    <LightBox />
                </div>

                <Footer />
            </div>
        </>
    )
}
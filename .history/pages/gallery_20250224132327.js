import styles from '@/styles/Gallery.module.css';
import HeaderArea from "@/components/HeadArea";
import NavBar from '@/components/NavBar';


export default function Gallery () {
    return (
        <>
            <HeaderArea title="Gallery" description="Gallery"/>
            <div className={styles.blendingMode}>
                <NavBar />
            </div>
        </>
    )
}
import styles from '@/styles/Beep.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';

export default function Beep() {
    return (
        <>
            <div className={styles.blendingMode}>
                <HeaderArea title="Beep" description="Beep"/>

                <NavBar />

                
            </div>
        </>
    )
}
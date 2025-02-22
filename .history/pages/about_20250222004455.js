import styles from '@/styles/About.module.css';
import NavBar from "@/components/NavBar";

export default function About () {
    return (
        <>
        <div className={styles.blendingMode}>
            <NavBar />
            <div className={styles.main}>
                <div className={styles.sec1}>
                    <div className={styles.sec1__img}>
                        <img src="/img/mon-logo-white.svg" alt="Monica Portrait" />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
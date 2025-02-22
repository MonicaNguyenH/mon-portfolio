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
                        <img src="/img/portrait.png" alt="Monica Portrait" />
                    </div>
                    <div className={styles.sec1__desc}>
                        <div className={styles.desc__top}>
                            <div className={styles.desc__left}>
                                <p>product designer</p>
                                <p>front-end developer</p>
                            </div>
                            <div className={styles.desc__right}>
                                <p>UX/UI</p>
                                <p>Graphic</p>
                            </div>
                        </div>

                        <div className={styles.desc__bot}>
                            <div className={styles.desc__left}>
                                <p>vietnam</p>
                                <p>hai phong city</p>
                            </div>
                            <div className={`${styles.desc__right} ${styles.desc_info}`}>
                                <p>2025</p>
                                <p>monica Nguyen</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
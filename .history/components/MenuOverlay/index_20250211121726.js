import styles from './MenuOverlay.module.css';

export default function MenuOverlay() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.menuContainer}>
                    <div className={styles.projects}>
                        <div className={`${styles.project} ${styles.p1}`}>
                            <div className={styles.client}>
                                <p>BEEP</p>
                            </div>
                            <div className={styles.category}>
                                <p>Development | UX UI Design</p>
                            </div>
                            <div className={styles.year}>
                                <p>2024</p>
                            </div>
                        </div>

                        <div className={`${styles.project} ${styles.p2}`}>
                            <div className={styles.client}>
                                <p>Trea</p>
                            </div>
                            <div className={styles.category}>
                                <p>Graphic Design</p>
                            </div>
                            <div className={styles.year}>
                                <p>2024</p>
                            </div>
                        </div>

                        <div className={`${styles.project} ${styles.p3}`}>
                            <div className={styles.client}>
                                <p>Vietname</p>
                            </div>
                            <div className={styles.category}>
                                <p>Graphic Design</p>
                            </div>
                            <div className={styles.year}>
                                <p>2024</p>
                            </div>
                        </div>

                        <div className={`${styles.project} ${styles.p4}`}>
                            <div className={styles.client}>
                                <p>Lunette</p>
                            </div>
                            <div className={styles.category}>
                                <p>UX UI Design</p>
                            </div>
                            <div className={styles.year}>
                                <p>2023</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
import styles from './VideoPlayer.module.css';

export default function VideoPlayer () {
    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.video__container}>
                    <video autoplay muted loop className={styles.mainVideo}>
                        <source src="/img/video/addiction.mp4" type="video/mp4"/>
                    </video>
                </div>
                <div className={styles.cursor}><p>Pause</p></div>
                <div className={styles.video__timeline}>
                    <div className={styles.video__marker}></div>
                    <div className={styles.video__timestamp}>
                        <p>00:00</p>
                        <p>00:10</p>
                        <p>00:20</p>
                        <p>00:30</p>
                        <p>00:40</p>
                        <p>00:50</p>
                        <p>01:00</p>
                        <p>01:10</p>
                        <p>01:20</p>
                        <p>01:30</p>
                        <p>01:40</p>
                        <p>01:50</p>
                        <p>02:00</p>
                        <p>02:10</p>
                        <p>02:20</p>
                    </div>
                </div>
            </div>
        </>
    )
}
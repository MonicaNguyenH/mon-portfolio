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
                        <p>00:05</p>
                        <p>00:10</p>
                        <p>00:15</p>
                        <p>00:20</p>
                        <p>00:25</p>
                        <p>00:30</p>
                        <p>00:35</p>
                        <p>00:40</p>
                        <p>00:45</p>
                        <p>00:50</p>
                        <p>00:55</p>
                        <p>01:00</p>
                    </div>
                </div>
            </div>
        </>
    )
}
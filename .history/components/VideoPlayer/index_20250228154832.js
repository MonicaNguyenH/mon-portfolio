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
                </div>
            </div>
        </>
    )
}
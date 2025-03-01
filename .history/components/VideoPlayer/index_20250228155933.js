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
                        {/* 15 <p> total  */}
                    </div>
                    <div className={styles.video__frames}>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/1.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/2.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/3.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/4.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/5.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/6.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/7.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/8.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/9.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/10.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/11.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/12.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/13.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/14.png" alt="" />
                        </div>
                        <div className={styles.frame}>
                            <img src="/img/video/snapshot/15.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
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

                <div className={styles.sec2}>
                    <p>Xin chào, or hello! My name is <span className={`${styles.pinkText} ${styles.boldText}`}>Monica</span>
                        , and I’m a digital designer and web developer based in Vancouver. I’m passionate about blending aesthetic design with seamless UX/UI to enhance user experiences—not just making things look good, but ensuring they feel good too.
                    </p>
                    <p>Through my portfolio, I hope to show not just my passion for design and technology, but also a reflection of myself. Each piece I’ve created holds personal value, and I’m proud of them—just like every creative mind should be.</p>
                </div>
            </div>
        </div>
        </>
    )
}
import styles from '@/styles/About.module.css';
import NavBar from "@/components/NavBar";
import Footer from '@/components/Footer';
import HeaderArea from '@/components/HeadArea';
import Canvas from '@/components/Canvas';

export default function About () {
    return (
        <>
            <HeaderArea title="About Mon" description="About Monica"/>
            <div className={styles.blendingMode}>
                <NavBar />
                <div className={styles.main}>
                    <div className={styles.sec1}>
                        <div className={styles.sec1__img}>
                            <img src="/img/portrait.webp" alt="Monica Portrait" />
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
                        <p>Xin chào, or hello! My name is <span className={styles.pinkText}>Monica</span>
                            , and I’m a digital designer and web developer based in Vancouver. I’m passionate about blending aesthetic design with seamless UX/UI to enhance user experiences. My work creates a blend of aesthetics and easy user experience.
                        </p>
                        <p>My portfolio reflects my love for exploring visual art. While I face many challenges on my path to becoming a designer, every obstacle fuels my curiosity and desire for improvement. As Albert Einstein said, <span className={styles.italicText}>“A person who never made a mistake never tried anything new.”</span></p>
                        <p>My portfolio isn’t just about design and tech. Every project on my portfolia contains a small piece of the puzzle that makes up my identity. Each piece holds personal value, and I’m proud of every work I've completed. However, the project I'm most proud of is my next one.</p>
                        <p className={styles.pinkText}>
                            Best, 
                            <br/>
                            Monica
                        </p>
                    </div>

                    <div className={styles.canvasContainer}>
                        <Canvas />
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    )
}
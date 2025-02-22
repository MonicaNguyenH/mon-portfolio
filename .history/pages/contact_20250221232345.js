import { useState } from "react";
import styles from '@/styles/Contact.module.css';
import NavBar from "@/components/NavBar";

export default function Contact() {
    return (
        <>
            <div className={styles.blendingMode}>
                <NavBar />
                <div className={styles.main}>
                    <div className={styles.footer__content}>
                        {/* Links */}
                        <div className={styles.contact__links}>
                            <a 
                                href="mailto:mon.ng.wrk@gmail.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.target.blur()}>
                                    EMAIL
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/monica-nguyen-hoingauloi" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={(e) => e.target.blur()}
                                className={styles.closer}>
                                    LINKEDIN
                            </a>
                            <a 
                                href="https://www.instagram.com/amazingworldofmonica/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={(e) => e.target.blur()}
                                className={styles.closer}>
                                    INSTAGRAM
                            </a>
                            <a 
                                href="/Monica_Nguyen_Resume.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={(e) => e.target.blur()}
                                className={styles.closer}>
                                    RESUME
                            </a>
                        </div>

                        <div className={styles.footer__caption}>
                            <div className={styles.contact__caption}>
                                <img src="/img/footer/contact-footer-white.svg" alt="contact caption" />
                            </div>

                            <div className={styles.footer__info}>
                                <p>MONICA NGUYEN</p>
                                <p>PRODUCT DESIGNER | FRONT-END DEVELOPER</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
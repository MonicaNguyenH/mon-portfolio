import styles from './Footer.module.css';
import { useState } from 'react';

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    {/* Links */}
                    <div className="footer-links">
                        <a href="mailto:mon.ng.wrk@gmail.com" target="_blank" rel="noopener noreferrer">EMAIL</a>
                        <a href="https://www.linkedin.com/in/monica-nguyen-hoingauloi" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                        <a href="https://www.instagram.com/amazingworldofmonica/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">RESUME</a>
                    </div>

                    {/* Title */}
                    <div>
                        <img src="/img/footer/contact-footer.svg" alt="contact caption" />
                    </div>

                    {/* Footer Info */}
                    <div className="footer-info">
                    <p>MONICA NGUYEN</p>
                    <p>PRODUCT DESIGNER | FRONT-END DEVELOPER</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
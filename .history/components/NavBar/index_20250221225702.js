import styles from './NavBar.module.css';
import { useRef } from 'react';
import Link from 'next/link';

export default function NavBar() {
    const audioRef = useRef(null);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0; 
            audioRef.current.play().catch(error => console.log("Audio playback error:", error));
        }
    };


    return (
        <>
            <div className={styles.nav}>
                <div className={styles.items_left}>
                    <Link href="/work">Work</Link>
                    <Link href="#">Gallery</Link>
                </div>
                <div className="logoContainer">
                    <Link href="/">
                        <img 
                            className="logo" 
                            src="/img/mon-logo-white.svg" 
                            alt="mon logo" 
                            onMouseEnter={playSound}
                            width={80} 
                            height={34}
                        />
                    </Link>
                </div>
                <div className={styles.items_right}>
                    <Link href="#">About</Link>
                    <Link href="#">Contact</Link>
                </div>
            </div>

            <audio ref={audioRef} src="/audio/duck-soundeffect.mov" preload="auto"></audio>
        </>
    )
};
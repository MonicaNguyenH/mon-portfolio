import styles from './NavBar.module.css';
import { useRef } from 'react';

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
                    <a href="/work">Work</a>
                    <a href="#">Gallery</a>
                </div>
                <div className="logo">
                    <img 
                        className="logo" 
                        src="/img/mon-logo-white.svg" 
                        alt="mon logo" 
                        onMouseEnter={playSound}
                        width={80} 
                        height={34}
                    />
                </div>
                <div className={styles.items_right}>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
            </div>

            <audio ref={audioRef} src="/audio/duck-soundeffect.mp3" preload="auto"></audio>
        </>
    )
};
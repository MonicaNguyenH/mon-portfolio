import { useEffect, useRef, useState } from 'react';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer() {
    const videoRef = useRef(null);
    const markerRef = useRef(null);
    const timelineRef = useRef(null);
    const cursorTextRef = useRef(null);
    const cursorRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        const marker = markerRef.current;
        const timeline = timelineRef.current;
        const cursorText = cursorTextRef.current;
        const cursor = cursorRef.current;

        if (!video || !marker || !timeline || !cursorText || !cursor) return;

        const handleTimeUpdate = () => {
            const percentage = (video.currentTime / video.duration) * 100;
            marker.style.left = `calc(${percentage}% - 1px)`;
        };

        const handleTimelineClick = (e) => {
            e.stopPropagation();
            const rect = timeline.getBoundingClientRect();
            const clickPosition = e.clientX - rect.left;
            const percentage = clickPosition / rect.width;
            video.currentTime = percentage * video.duration;
            marker.style.left = `calc(${percentage * 100}% - 1px)`;
        };

        const handleDocumentClick = (e) => {
            const setIsTimelineVisible = false;
            
            if (!timeline.contains(e.target)) {
                if (isPlaying) {
                    video.pause();
                    cursorText.textContent = "Play";
                    setIsTimelineVisible(true); 
                } else {
                    video.play();
                    cursorText.textContent = "Pause";
                    setIsTimelineVisible(false); 
                }
                setIsPlaying(!isPlaying);
            }
        };

        const handleMouseMove = (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        timeline.addEventListener("click", handleTimelineClick);
        document.addEventListener("click", handleDocumentClick);
        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            timeline.removeEventListener("click", handleTimelineClick);
            document.removeEventListener("click", handleDocumentClick);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isPlaying]);

    return (
        <div className={styles.overlay}>
            <div className={styles.video__container}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    className={styles.mainVideo}
                >
                    <source src="/img/video/addiction.mp4" type="video/mp4" />
                </video>
            </div>
            <div ref={cursorRef} className={styles.cursor}>
                <p ref={cursorTextRef}>Pause</p>
            </div>
            <div ref={timelineRef} className={styles.video__timeline}>
                <div ref={markerRef} className={styles.video__marker}></div>
                <div className={styles.video__timestamp}>
                    {Array.from({ length: 15 }, (_, i) => {
                        const minutes = Math.floor((i * 10) / 60);
                        const seconds = (i * 10) % 60;
                        return (
                            <p key={i}>{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</p>
                        );
                    })}
                </div>
                <div className={styles.video__frames}>
                    {Array.from({ length: 15 }, (_, i) => (
                        <div key={i} className={styles.frame}>
                            <img
                                src={`/img/video/snapshot/${i + 1}.png`}
                                alt={`Snapshot ${i + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
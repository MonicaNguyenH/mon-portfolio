import { useEffect, useRef, useState } from 'react';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer() {
    const videoRef = useRef(null);
    const markerRef = useRef(null);
    const timelineRef = useRef(null);
    const cursorTextRef = useRef(null);
    const cursorRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [isTimelineVisible, setIsTimelineVisible] = useState(false); // State for timeline visibility

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
            if (!timeline.contains(e.target)) {
                if (isPlaying) {
                    video.pause();
                    cursorText.textContent = "Play";
                } else {
                    video.play();
                    cursorText.textContent = "Pause";
                }
                setIsPlaying(!isPlaying);
            }
        };

        const handleMouseMove = (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        };

        const handleScroll = () => {
            const rect = video.getBoundingClientRect();
            if (rect.bottom <= window.innerHeight + 100) { // Show timeline when near the bottom
                setIsTimelineVisible(true);
            } else {
                setIsTimelineVisible(false);
            }
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        timeline.addEventListener("click", handleTimelineClick);
        document.addEventListener("click", handleDocumentClick);
        document.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            timeline.removeEventListener("click", handleTimelineClick);
            document.removeEventListener("click", handleDocumentClick);
            document.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
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
            <div
                ref={timelineRef}
                className={styles.video__timeline}
                style={{ bottom: isTimelineVisible ? 0 : '-160px' }} // Control visibility with state
            >
                <div ref={markerRef} className={styles.video__marker}></div>
                <div className={styles.video__timestamp}>
                    {Array.from({ length: 15 }, (_, i) => (
                        <p key={i}>{`00:${i < 10 ? `0${i}` : i}0`}</p>
                    ))}
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
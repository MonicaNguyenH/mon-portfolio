import styles from '@/styles/Testing.module.css';

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function MenuOverlay() {
    const previewRef = useRef(null);
    const imgRef = useRef(null);
    const containerRef = useRef(null);
    const [activeImage, setActiveImage] = useState(null);
    const [prevImage, setPrevImage] = useState(null);
    const [projects, setProjects] = useState([]);

    // 🔥 Fetch project data and randomize selection
    useEffect(() => {
        fetch("/data/projects.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Fetched Data:", data);
                const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 4);
                setProjects(shuffled);
            })
            .catch((err) => console.error("Error loading projects:", err));
    }, []);

    // ✅ Move preview image with cursor
    const moveProject = (e) => {
        if (!previewRef.current) return;
        const previewRect = previewRef.current.getBoundingClientRect();
        previewRef.current.style.left = `${e.pageX - previewRect.width / 2}px`;
        previewRef.current.style.top = `${e.pageY - previewRect.height / 2}px`;
    };

    // ✅ Smooth slide animation for preview image
    const changeImage = (newImage) => {
        if (!imgRef.current) return;

        if (newImage !== activeImage) {
            setPrevImage(activeImage);
            setActiveImage(newImage);

            // Slide animation effect
            gsap.fromTo(
                imgRef.current,
                { y: 20, opacity: 0 }, // Start position (below)
                { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" } // Slide up effect
            );
        }
    };

    return (
        <div className={styles.main}>
            {/* Hover Preview Image */}
            <div ref={previewRef} className={styles.preview}>
                {activeImage && (
                    <img 
                        ref={imgRef}
                        src={activeImage} 
                        alt="Preview" 
                        className={styles.previewImg} 
                        onError={() => console.error("Failed to load image:", activeImage)}
                    />
                )}
            </div>

            {/* Projects List */}
            <div ref={containerRef} className={styles.menuContainer}>
                <div className={styles.projects}>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <Link key={project.id} href={project.link} passHref>
                                <div
                                    className={`${styles.project} ${styles[project.id]}`}
                                    onMouseMove={moveProject}
                                    onMouseEnter={() => changeImage(project.image)}
                                    onMouseLeave={() => setPrevImage(null)}
                                >
                                    <div className={styles.client}>
                                        <p>{project.name}</p>
                                    </div>
                                    <div className={styles.category}>
                                        <p>{project.category}</p>
                                    </div>
                                    <div className={styles.year}>
                                        <p>{project.year}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p style={{ color: "red", textAlign: "center" }}>No projects loaded</p>
                    )}
                </div>
            </div>
        </div>
    );
}

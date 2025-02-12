import { useState, useEffect, useRef } from "react";
import styles from "./MenuOverlay.module.css";
import gsap from "gsap";
import Link from "next/link"; // For page navigation

export default function MenuOverlay() {
    const previewRef = useRef(null);
    const containerRef = useRef(null);
    const [activeImage, setActiveImage] = useState(null);
    const [projects, setProjects] = useState([]); // Stores fetched projects

    // 🔥 Fetch project data and randomize selection
    useEffect(() => {
        fetch("/data/projects.json") // Fetch from public/data folder
            .then((res) => res.json())
            .then((data) => {
                // Shuffle and select only 4 random projects
                const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 4);
                setProjects(shuffled);
            })
            .catch((err) => console.error("Error loading projects:", err));
    }, []);

    // ✅ Move preview with mouse
    const moveProject = (e) => {
        if (!previewRef.current) return;
        const previewRect = previewRef.current.getBoundingClientRect();
        previewRef.current.style.left = `${e.pageX - previewRect.width / 2}px`;
        previewRef.current.style.top = `${e.pageY - previewRect.height / 2}px`;
    };

    return (
        <div className={styles.main}>
            {/* Preview Image */}
            <div ref={previewRef} className={styles.preview}>
                {activeImage && (
                    <img src={activeImage} alt="Preview" className={styles.previewImg} />
                )}
            </div>

            {/* Menu List */}
            <div ref={containerRef} className={styles.menuContainer}>
                <div className={styles.projects}>
                    {projects.map((project) => (
                        <Link key={project.id} href={project.link} passHref>
                            <div
                                className={`${styles.project} ${styles[project.id]}`}
                                onMouseMove={moveProject}
                                onMouseEnter={() => setActiveImage(project.image)}
                                onMouseLeave={() => setActiveImage(null)}
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
                    ))}
                </div>
            </div>
        </div>
    );
}

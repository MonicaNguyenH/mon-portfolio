import { useState, useEffect, useRef } from "react";
import styles from "./MenuOverlay.module.css";
import gsap from "gsap";
import Link from "next/link";

export default function MenuOverlay() {
    const previewRef = useRef(null);
    const containerRef = useRef(null);
    const [activeImage, setActiveImage] = useState(null);
    const [projects, setProjects] = useState([]);

    // 🔥 Fetch project data and randomize selection
    useEffect(() => {
        fetch("/data/projects.json") // ✅ Fetch JSON from public/data
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Fetched Data:", data); // ✅ Debug: Check if JSON is loading
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

    return (
        <div className={styles.main}>
            {/* Hover Preview Image */}
            <div ref={previewRef} className={styles.preview}>
                {activeImage && (
                    <>
                        <img 
                            src={activeImage} 
                            alt="Preview" 
                            className={styles.previewImg} 
                            onError={() => console.error("Failed to load image:", activeImage)} // ❌ Detect broken images
                        />
                        <p style={{ color: "white", textAlign: "center" }}>{activeImage}</p> {/* ✅ Debug: Shows image path */}
                    </>
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
                                    onMouseEnter={() => {
                                        console.log("Hovering over:", project.image); // ✅ Debug: Logs image paths
                                        setActiveImage(project.image);
                                    }}
                                    onMouseLeave={() => setActiveImage(null)}
                                >
                                    <div className={styles.client}>
                                        <p style={{ textDecoration: "none" }}>{project.name}</p>
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
                        <p style={{ color: "red", textAlign: "center" }}>No projects loaded</p> // ❌ Debug: Displays error if no projects load
                    )}
                </div>
            </div>
        </div>
    );
}

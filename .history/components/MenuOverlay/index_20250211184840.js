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
    
        gsap.to(previewRef.current, {
            duration: 0.3,
            x: e.clientX - 125, // Centering the image (125px is half of 250px width)
            y: e.clientY - 125,
            ease: "power2.out"
        });
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
                                        console.log("Hovering over:", project.image); 
                                    
                                        // Check if the image is changing
                                        if (activeImage !== project.image) {
                                            const direction = activeImage ? (projects.findIndex(p => p.image === activeImage) < projects.findIndex(p => p.image === project.image) ? 1 : -1) : 1;
                                    
                                            gsap.fromTo(
                                                previewRef.current,
                                                { y: direction * 50, opacity: 0 }, // Start position (shifted slightly)
                                                { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" } // Animate to normal
                                            );
                                    
                                            setActiveImage(project.image);
                                        }
                                    }}                                    
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
                        <p style={{ color: "red", textAlign: "center" }}>No projects loaded</p> // ❌ Debug: Displays error if no projects load
                    )}
                </div>
            </div>
        </div>
    );
}

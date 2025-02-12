import { useState, useEffect, useRef } from "react";
import styles from "./MenuOverlay.module.css";
import gsap from "gsap";

// Sample project data (replace with fetch later)
const projectData = [
    {
        id: "p1",
        name: "BEEP",
        category: "Development | UX UI Design",
        year: 2024,
        image: "/img/graphic/trea/cover.webp",
    },
    {
        id: "p2",
        name: "Trea",
        category: "Graphic Design",
        year: 2024,
        image: "/images/trea.jpg",
    },
    {
        id: "p3",
        name: "Vietname",
        category: "Graphic Design",
        year: 2024,
        image: "/images/vietname.jpg",
    },
    {
        id: "p4",
        name: "Lunette",
        category: "UX UI Design",
        year: 2023,
        image: "/images/lunette.jpg",
    },
];

export default function MenuOverlay() {
    const previewRef = useRef(null);
    const containerRef = useRef(null);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        const moveStuff = (e) => {
            if (!previewRef.current || !containerRef.current) return;

            const isInside = isMouseInsideContainer(e);
            gsap.to(previewRef.current, { scale: isInside ? 1 : 0, duration: 0.3 });
        };

        const isMouseInsideContainer = (e) => {
            if (!containerRef.current) return false;
            const containerRect = containerRef.current.getBoundingClientRect();
            return (
                e.pageX >= containerRect.left &&
                e.pageX <= containerRect.right &&
                e.pageY >= containerRect.top &&
                e.pageY <= containerRect.bottom
            );
        };

        window.addEventListener("mousemove", moveStuff);
        return () => {
            window.removeEventListener("mousemove", moveStuff);
        };
    }, []);

    // ✅ Define `moveProject` to handle cursor movement
    const moveProject = (e) => {
        if (!previewRef.current) return;
        const previewRect = previewRef.current.getBoundingClientRect();
        previewRef.current.style.left = `${e.pageX - previewRect.width / 2}px`;
        previewRef.current.style.top = `${e.pageY - previewRect.height / 2}px`;
    };

    return (
        <div className={styles.main}>
            {/* Preview Box */}
            <div ref={previewRef} className={styles.preview}>
                {activeImage && (
                    <img 
                        src={activeImage} 
                        alt="Preview" 
                        className={styles.previewImg} 
                    />
                )}
            </div>


            <div ref={containerRef} className={styles.menuContainer}>
                <div className={styles.projects}>
                    {projectData.map((project) => (
                        <div
                            key={project.id}
                            className={`${styles.project} ${styles[project.id]}`}
                            onMouseMove={moveProject} // 🔥 Now properly defined
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
                    ))}
                </div>
            </div>
        </div>
    );
}

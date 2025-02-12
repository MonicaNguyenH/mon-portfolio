import styles from './MenuOverlay.module.css';
import { useState, useEffect, useRef } from 'react';

export default function MenuOverlay() {
    const projects = document.querySelectorAll(".projects");
    const preview = document.querySelectorAll(".preview");
    const previewImg = document.querySelectorAll(".preview__img");

    let isInside = false; 

    const bgPositions = {
        p1: "0 0",
        p2: "0 33.33%",
        p3: "0 66.66%",
        p4: "0 100%",
    };

    const moveStuff = (e) => {
        const mouseInside = isMouseInsideContainer(e);

        if(mouseInside !== isInside) {
            isInside = mouseInside;
            if (isInside) {
                gsap.to(preview, 0.3, {
                    scale: 1,
                });
            } else {
                gsap.to(preview, 0.3, {
                    scale: 0,
                });
            }
        }
    };

    const moveProject = (e) => {
        const previewRect = preview.getBoundingClientRect();
        const offsetX = previewRect.width / 2;
        const offsetY = previewRect.height / 2;

        preview.style.left = e.pageX - offsetX + "px";
        preview.style.top = e.pageY - offsetY + "px";
    };

    const moveProjectImg = (project) => {
        const projectId = project.id;
        gsap.to(previewImg, 0.4, {
            backgroundPosition: bgPositions[projectId] || "0 0",
        });
    };

    const isMouseInsideContainer = (e) => {
        const containerRect = projects.getBoundingClientRect();
        return (
            e.pageX >= containerRect.left &&
            e.pageX <= containerRect.right &&
            e.pageY >= containerRect.top &&
            e.pageY <= containerRect.bottom
        );
    };

    window.addEventListener("mousemove", moveStuff);

    Array.from(projects, children).forEach((project) => {
        project.addEventListener("mousemove", moveProject);
        project.addEventListener("mousemove", moveProjectImg.bind(null, project));
    })



    return (
        <>
            <div className={styles.main}>
                <div className={styles.preview}>
                    <div className={styles.preview__img}>
                </div>
                </div>
                <div className={styles.menuContainer}>
                    <div className={styles.projects}>
                        <div className={`${styles.project} ${styles.p1}`}>
                            <div className={styles.client}>
                                <p>BEEP</p>
                            </div>
                            <div className={styles.category}>
                                <p>Development | UX UI Design</p>
                            </div>
                            <div className={styles.year}>
                                <p>2024</p>
                            </div>
                        </div>

                        <div className={`${styles.project} ${styles.p2}`}>
                            <div className={styles.client}>
                                <p>Trea</p>
                            </div>
                            <div className={styles.category}>
                                <p>Graphic Design</p>
                            </div>
                            <div className={styles.year}>
                                <p>2024</p>
                            </div>
                        </div>

                        <div className={`${styles.project} ${styles.p3}`}>
                            <div className={styles.client}>
                                <p>Vietname</p>
                            </div>
                            <div className={styles.category}>
                                <p>Graphic Design</p>
                            </div>
                            <div className={styles.year}>
                                <p>2024</p>
                            </div>
                        </div>

                        <div className={`${styles.project} ${styles.p4}`}>
                            <div className={styles.client}>
                                <p>Lunette</p>
                            </div>
                            <div className={styles.category}>
                                <p>UX UI Design</p>
                            </div>
                            <div className={styles.year}>
                                <p>2023</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
import { useEffect, useRef } from 'react';
import styles from './LightBox.module.css';
import gsap from 'gsap';

export default function LightBox() {
    const itemsRef = useRef([]);
    const containerRef = useRef(null);
    const isGalleryOpenRef = useRef(false);
    const tl = useRef(gsap.timeline());

    // Stable function reference for handleItemClick
    const handleItemClick = (item, initialRotation, x, y) => {
        if (!isGalleryOpenRef.current) {
            isGalleryOpenRef.current = true;

            const duplicate = item.cloneNode(true);
            duplicate.style.position = 'absolute';
            containerRef.current.appendChild(duplicate);

            gsap.to(itemsRef.current.filter(i => i !== item), {
                scale: 0,
                duration: 0.5,
                ease: "power2.in",
                stagger: 0.05
            });

            const endRotation = initialRotation > 180 ? initialRotation - 360 : initialRotation;

            gsap.to([item, duplicate], {
                rotation: endRotation,
                duration: 0.001,
                onComplete: () => {
                    gsap.to([item, duplicate], {
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%) scale(5)",
                        duration: 1,
                        ease: "power2.out",
                        delay: 1.25
                    });
                }
            });

            const closeGallery = () => {
                if (isGalleryOpenRef.current) {
                    gsap.to([item, duplicate], {
                        left: x + 'px',
                        top: y + 'px',
                        scale: 1,
                        rotation: initialRotation,
                        duration: 1,
                        ease: "power2.out",
                        onComplete: () => {
                            duplicate.remove();
                            gsap.to(itemsRef.current, {
                                scale: 1,
                                duration: 1,
                                stagger: 0.05,
                                ease: "power2.out"
                            });
                            isGalleryOpenRef.current = false;
                        }
                    });
                }
            };

            item.addEventListener('click', closeGallery);
            duplicate.addEventListener('click', closeGallery);
        }
    };

    useEffect(() => {
        const items = itemsRef.current;
        const container = containerRef.current;
        const numberOfItems = items.length;
        const angleIncrement = (2 * Math.PI) / numberOfItems;
        const radius = 300;

        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        items.forEach((item, index) => {
            const img = document.createElement('img');
            img.src = `/img/gallery/img${index + 1}.webp`;
            console.log(`Image path: /img/gallery/img${index + 1}.webp`);
            item.appendChild(img);

            const angle = index * angleIncrement;
            const initialRotation = (angle * 180 / Math.PI) - 90;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            gsap.set(item, { scale: 0 });

            tl.current.to(item, {
                left: x + 'px',
                top: y + 'px',
                rotation: initialRotation,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                delay: 1
            }, index * 0.1);

            // Add event listener with stable function reference
            const clickHandler = () => handleItemClick(item, initialRotation, x, y);
            item.addEventListener('click', clickHandler);

            // Cleanup: Remove the same event listener
            return () => {
                item.removeEventListener('click', clickHandler);
            };
        });
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.gallery}>
                {[...Array(15)].map((_, index) => (
                    <div key={index} className={styles.item} ref={el => itemsRef.current[index] = el}></div>
                ))}
            </div>
        </div>
    );
}
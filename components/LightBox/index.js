import { useEffect, useRef } from 'react';
import styles from './LightBox.module.css';
import gsap from 'gsap';

export default function LightBox() {
    const itemsRef = useRef([]);
    const containerRef = useRef(null);
    const isGalleryOpenRef = useRef(false);
    const tl = useRef(gsap.timeline());
    const activeItemRef = useRef(null);

    // Function to add hover effect to an element
    const addHoverEffect = (element) => {
        if (!element) return;
    
        const imgElement = element.querySelector('img');
        if (!imgElement) return;
    
        // Get exact image dimensions
        const { offsetWidth: imgWidth, offsetHeight: imgHeight } = imgElement;
        
        // Set your desired approximate block size (e.g., 10-15px)
        const targetBlockSize = 12; 
        
        // Calculate how many full blocks fit
        const cols = Math.floor(imgWidth / targetBlockSize);
        const rows = Math.floor(imgHeight / targetBlockSize);
        
        // Calculate exact block size needed to stretch perfectly
        const exactBlockWidth = imgWidth / cols;
        const exactBlockHeight = imgHeight / rows;
        
        // Create container
        const grid = document.createElement('div');
        grid.className = styles.cubeGrid;
        grid.style.gridTemplateColumns = `repeat(${cols}, ${exactBlockWidth}px)`;
        grid.style.gridTemplateRows = `repeat(${rows}, ${exactBlockHeight}px)`;
        grid.style.width = `${imgWidth}px`;
        grid.style.height = `${imgHeight}px`;
    
        // Fill with cubes
        Array.from({ length: cols * rows }).forEach(() => {
            const cube = document.createElement('div');
            cube.className = styles.cube;
            grid.appendChild(cube);
            
            // Hover effect
            cube.onmouseover = () => {
                cube.style.opacity = '0.75';
                setTimeout(() => cube.style.opacity = '0', 300);
            };
        });
    
        // Position over image
        grid.style.position = 'absolute';
        grid.style.left = '0';
        grid.style.top = '0';
        element.appendChild(grid);
    };

    const handleItemClick = (item, initialRotation, x, y) => {
        if (!isGalleryOpenRef.current) {
            // Open gallery
            isGalleryOpenRef.current = true;
            activeItemRef.current = item;

            const duplicate = item.cloneNode(true);
            duplicate.style.position = 'absolute';
            containerRef.current.appendChild(duplicate);

            // Hide other items
            gsap.to(itemsRef.current.filter(i => i !== item), {
                scale: 0,
                duration: 0.5,
                ease: "power2.in",
                stagger: 0.05
            });

            const endRotation = initialRotation > 180 ? initialRotation - 360 : initialRotation;

            // Animate to center
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
                        delay: 1.25,
                        onComplete: () => {
                            // Add hover effect to the duplicate
                            addHoverEffect(duplicate);
                        }
                    });
                }
            });

            const closeGallery = () => {
                if (isGalleryOpenRef.current) {
                    isGalleryOpenRef.current = false;
                    
                    // Remove hover effect blocks if they exist
                    const blocks = duplicate.querySelector(`.${styles.cubeBlocks}`);
                    if (blocks) blocks.remove();

                    // Animate back to original position
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
                        }
                    });
                }
            };

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

            const clickHandler = () => handleItemClick(item, initialRotation, x, y);
            item.addEventListener('click', clickHandler);

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
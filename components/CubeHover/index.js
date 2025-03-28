import { useEffect, useRef } from 'react';
import styles from './CubeHover.module.css';

export default function CubeHover() {
  const containerRef = useRef(null);
  const blocksRef = useRef(null);
  const blockSize = 50; // Your original 50px size

  useEffect(() => {
    if (!containerRef.current || !blocksRef.current) return;

    const container = containerRef.current;
    const blocksContainer = blocksRef.current;
    
    // Calculate rows and columns needed
    const cols = Math.floor(container.offsetWidth / blockSize);
    const rows = Math.floor(container.offsetHeight / blockSize);
    const totalBlocks = cols * rows;

    // Clear existing blocks
    blocksContainer.innerHTML = '';

    // Create blocks
    for (let i = 0; i < totalBlocks; i++) {
      const block = document.createElement('div');
      block.className = styles.block;
      blocksContainer.appendChild(block);
    }

    // Original hover logic
    const blocks = blocksContainer.querySelectorAll(`.${styles.block}`);
    const resetDuration = 300;

    blocks.forEach(block => {
      let timeoutId;
      block.addEventListener("mouseover", () => {
        clearTimeout(timeoutId);
        block.classList.add(styles.active);
        timeoutId = setTimeout(() => {
          block.classList.remove(styles.active);
        }, resetDuration);
      });
    });

  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.img__container} ref={containerRef}>
        <div className={styles.img}>
          <img src="/img/gallery/img1.webp" alt="Gallery Img" />
        </div>
        <div className={styles.img__overlay}></div>
        <div className={styles.img__blocks} ref={blocksRef}>
          {/* Blocks will be inserted here dynamically */}
        </div>
      </div>
    </div>
  );
}
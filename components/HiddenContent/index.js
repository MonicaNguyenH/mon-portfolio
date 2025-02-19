import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HiddenContent.module.css';

export default function MaskedContent() {
  const hiddenContentRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      gsap.to(hiddenContentRef.current, {
        '--x': `${x}px`,
        '--y': `${y}px`,
        duration: 0.4,
        ease: 'power4.out',
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
    <div className={styles.bg}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p>Have you ever noticed that cats have a peculiar fascination with keyboards?</p>
        </div>
        <div className={styles.textBlock}>
          <p>Do not share this information with anyone</p>
        </div>
        <div className={styles.linkContainer}>
          <a href="https://greensock.com/" target="_blank" rel="noopener noreferrer">
            psst discover more
          </a>
        </div>
      </div>
      <div className={styles.hiddenContent} ref={hiddenContentRef}>
        <div className={styles.textBlock}>
          <p>I am convinced that cats secretly control the Internet.</p>
        </div>
        <div className={styles.textBlock}>
          <p>especially not with the cats!</p>
        </div>
        <div className={styles.linkContainer}>
          <span>psst discover more</span>
        </div>
      </div>
    </div>

    </div>
  );
}



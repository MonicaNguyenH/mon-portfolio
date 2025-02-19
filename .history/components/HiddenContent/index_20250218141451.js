import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HiddenContent.module.css';

export default function MaskedContent() {
  const maskRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const mask = maskRef.current;
    const content = contentRef.current;

    document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      gsap.to(mask, {
        x: x - 75, // Center the mask on cursor
        y: y - 75,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    return () => document.removeEventListener('mousemove', () => {});
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} ref={contentRef}>
        <h1>Visible Content</h1>
        <p>This is the text that stays visible.</p>
      </div>

      <div className={styles.hiddenContent}>
        <h1>Hidden Content</h1>
        <p>This content is only visible inside the mask.</p>
      </div>

      <div ref={maskRef} className={styles.mask}></div>
    </div>
  );
}

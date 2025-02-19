import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HiddenContent.module.css';

export default function MaskedContent() {
  const maskRef = useRef(null);
  const hiddenRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      gsap.to(maskRef.current, {
        x: x - 75, // Center the mask on cursor
        y: y - 75,
        duration: 0.2,
        ease: 'power2.out',
      });

      gsap.to(hiddenRef.current, {
        webkitMaskPosition: `${x}px ${y}px`,
        maskPosition: `${x}px ${y}px`,
        duration: 0.2,
        ease: 'power2.out',
      });
    });

    return () => document.removeEventListener('mousemove', () => {});
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.hiddenContent} ref={hiddenRef}>
        <h1>Hidden Content</h1>
        <p>This content is only visible inside the mask.</p>
      </div>

      <div className={styles.content}>
        <h1>Visible Content</h1>
        <p>This is the text that stays visible.</p>
      </div>

      <div ref={maskRef} className={styles.mask}></div>
    </div>
  );
}

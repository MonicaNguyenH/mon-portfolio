import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HiddenContent.module.css';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from '../styles/Home.module.css';

export default function MaskedContent() {
  const maskRef = useRef(null);
  const hiddenContentRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Correcting mask offset (shifting it by half width & height)
      const maskSize = 150;
      const offsetX = maskSize / 2;
      const offsetY = maskSize / 2;

      gsap.to(maskRef.current, {
        x: x - offsetX,
        y: y - offsetY,
        duration: 0.2,
        ease: 'power2.out',
      });

      gsap.to(hiddenContentRef.current, {
        '--maskX': `${x}px`,
        '--maskY': `${y}px`,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
      <div className={styles.hiddenContent} ref={hiddenContentRef}>
        <p>Hidden Content Revealed by Mask</p>
      </div>

      <div className={styles.content}>
        <p>Visible Content</p>
      </div>

      <div ref={maskRef} className={styles.mask}></div>
    </div>
    </div>
    
  );
}


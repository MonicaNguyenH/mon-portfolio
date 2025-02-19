import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './HiddenContent.module.css';

export default function MaskedContent() {
  const maskRef = useRef(null);
  const hiddenContentRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Update mask position
      gsap.to(maskRef.current, {
        x: x - 2, // Adjust to center the mask on the cursor
        y: y - 2,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Update hidden content mask position
      gsap.to(hiddenContentRef.current, {
        '--maskX': `${x}px`,
        '--maskY': `${y}px`,
        duration: 0.3,
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
      <div className={styles.content}>
        <p>Visible Content</p>
        <p>More visible text here.</p>
      </div>
      <div className={styles.hiddenContent} ref={hiddenContentRef}>
        <p>Hidden Content Revealed by Mask</p>
        <p>Additional hidden text.</p>
      </div>
      <div ref={maskRef} className={styles.mask}></div>
    </div>
    </div>
    
  );
}

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollIndex.module.css';

export default function ScrollIndex({ targetRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const wrapperRef = useRef(null);

  const togglePopover = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const updateProgress = () => {
      if (!targetRef?.current) return;
  
      const mainEl = targetRef.current;
      const mainTop = mainEl.offsetTop;
      const mainHeight = mainEl.offsetHeight;
      const mainBottom = mainTop + mainHeight;
  
      const scrollY = window.scrollY + window.innerHeight / 2; // Middle of viewport
  
      // Clamp scroll within main section
      if (scrollY < mainTop) {
        setScrollPercent(0);
      } else if (scrollY > mainBottom) {
        setScrollPercent(100);
      } else {
        const progress = Math.round(((scrollY - mainTop) / mainHeight) * 100);
        setScrollPercent(progress);
      }
    };
  
    window.addEventListener('scroll', updateProgress);
    updateProgress();
  
    return () => window.removeEventListener('scroll', updateProgress);
  }, [targetRef]);
  

  // Close popover on link click
  useEffect(() => {
    const links = wrapperRef.current?.querySelectorAll('a');
    const handleClick = () => setIsOpen(false);
    links?.forEach(link => link.addEventListener('click', handleClick));
    return () => links?.forEach(link => link.removeEventListener('click', handleClick));
  }, []);

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}>
      <button className={styles.trigger} onClick={togglePopover}>
        {!isOpen ? (
          <div className={styles.trigger__details}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="2" width="24" height="20">
                <path d="M3 6.75L19.0541 6.75L21.027 6.75H23.0135L23 3.5L1 3.5L1 12L23 12L23.0135 21L1 21L1 17.25L13 17.25" strokeWidth="2.5" stroke="gray" />
              </mask>
              <g mask="url(#mask0)">
                <rect x="3" y="6" width="18" height="12" fill="gray" />
              </g>
              <mask id="mask1" maskUnits="userSpaceOnUse" x="0" y="2" width="24" height="20">
                <path className={styles.lines} d="M3 6.75L19.0541 6.75L21.027 6.75H23.0135L23 3.5L1 3.5L1 12L23 12L23.0135 21L1 21L1 17.25L13 17.25" stroke="white" strokeWidth="2.5" pathLength="1.025" strokeDasharray="1.025" strokeDashoffset="1.025" />
              </mask>
              <g mask="url(#mask1)">
                <rect x="3" y="6" width="18" height="12" fill="white" />
              </g>
            </svg>
            <span>
              <span>Index</span>
              <svg className={styles.size6} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            </span>
            <span className={styles.progress}>{scrollPercent}%</span>
          </div>
        ) : (
          <ol className={styles.popoverList}>
            <li className={styles.listItem}><a href="#problem" className={styles.listLink}>Problem Statement</a></li>
            <li className={styles.listItem}><a href="#solution" className={styles.listLink}>Solution</a></li>
            <li className={styles.listItem}><a href="#overview" className={styles.listLink}>Overview</a></li>
            <li className={styles.listItem}><a href="#user-flow" className={styles.listLink}>User Flow</a></li>
            <li className={styles.listItem}><a href="#persona" className={styles.listLink}>Persona</a></li>
            <li className={styles.listItem}><a href="#styleguide" className={styles.listLink}>Styleguide</a></li>
            <li className={styles.listItem}><a href="#typography" className={styles.listLink}>Typography</a></li>
            <li className={styles.listItem}><a href="#mockup" className={styles.listLink}>Mockups</a></li>
          </ol>
        )}
      </button>
    </div>
  );
}

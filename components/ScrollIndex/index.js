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
      const rect = mainEl.getBoundingClientRect();

      const mainTop = window.scrollY + rect.top;
      const mainBottom = mainTop + mainEl.offsetHeight;

      const start = mainTop;
      const end = mainBottom - window.innerHeight;

      if (window.scrollY <= start) {
        setScrollPercent(0);
        return;
      }

      if (window.scrollY >= end) {
        setScrollPercent(100);
        return;
      }

      const progress = Math.round(((window.scrollY - start) / (end - start)) * 100);
      setScrollPercent(progress);
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [targetRef]);

  useEffect(() => {
    if (!isOpen) return;

    const links = wrapperRef.current?.querySelectorAll('a');
    const handleClick = () => setIsOpen(false);

    links?.forEach(link => link.addEventListener('click', handleClick));

    return () => {
      links?.forEach(link => link.removeEventListener('click', handleClick));
    };
  }, [isOpen]);

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

            <span className={styles.index__wrapper}>
              <span>Contents</span>
              <svg className={styles.size6} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            </span>

            <span className={styles.progress}>{scrollPercent}%</span>
          </div>
        ) : (
          <div className={styles.popoverList}>
            <a href="#overview" className={`${styles.listLink} ${styles.overviewLink}`}>Overview</a>

            <ol className={styles.numberedList}>
              <li className={styles.listItem}><a href="#p1" className={styles.listLink}>Problem Space</a></li>
              <li className={styles.listItem}><a href="#p2" className={styles.listLink}>Landscape</a></li>
              <li className={styles.listItem}><a href="#p3" className={styles.listLink}>Direction</a></li>
              <li className={styles.listItem}><a href="#p4" className={styles.listLink}>Visual System</a></li>
              <li className={styles.listItem}><a href="#p5" className={styles.listLink}>Interface</a></li>
              <li className={styles.listItem}><a href="#p6" className={styles.listLink}>Extensions</a></li>
              <li className={styles.listItem}><a href="#p7" className={styles.listLink}>Reflection</a></li>
            </ol>
          </div>
        )}
      </button>
    </div>
  );
}
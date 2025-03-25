'use client';

import { useEffect } from 'react';
import styles from './DragVietname.module.css';
import { gsap } from 'gsap';

export default function DragVietname() {
  useEffect(() => {
    // Dynamically import Draggable on client-side only
    if (typeof window !== 'undefined') {
      import('gsap/Draggable').then(({ Draggable }) => {
        gsap.registerPlugin(Draggable);

        const timeline = document.querySelector(`.${styles.timeline}`);
        const scroller = document.querySelector(`.${styles.scroller}`);
        const container = document.querySelector(`.${styles.container}`);
        const timelineWidth = timeline.offsetWidth;
        const scrollerWidth = scroller.offsetWidth;
        const gap = parseInt(window.getComputedStyle(document.body).fontSize);

        const maxDragX = timelineWidth - scrollerWidth - 2 * gap;

        for (let i = 0; i < 50; i++) {
          const marker = document.createElement("div");
          marker.classList.add(styles.marker);
          timeline.appendChild(marker);
        }

        Draggable.create(scroller, {
          type: "x",
          bounds: {
            minX: gap,
            maxX: timelineWidth - scrollerWidth - gap
          },
          onDrag: function () {
            let progress = (this.x - gap) / maxDragX;
            let containerX = -400 * (timelineWidth / 100) * progress;
            gsap.to(container, {
              x: containerX,
              duration: 1,
              ease: "power3.out"
            });
          }
        });
      });
    }
  }, []);

  return (
    <div className={styles.main}> 
      <div className={styles.container}>
        <section id="section-1" className={styles.container__single}>
          <img src="/img/graphic/vietname/print/print-1.webp" alt="Vietname" />
        </section>
        <section id="section-2" className={styles.container__couple}>
          <img src="/img/graphic/vietname/print/print-2.1.webp" alt="Vietname" />
          <img src="/img/graphic/vietname/print/print-2.2.webp" alt="Vietname" />
        </section>
        <section id="section-3" className={styles.container__single}>
          <img src="/img/graphic/vietname/print/print-3.webp" alt="Vietname" />
        </section>
        <section id="section-4" className={styles.container__single}>
          <img src="/img/graphic/vietname/print/print-4.webp" alt="Vietname" />
        </section>
        <section id="section-5" className={styles.container__couple}>
          <img src="/img/graphic/vietname/print/print-5.1.webp" alt="Vietname" />
          <img src="/img/graphic/vietname/print/print-5.2.webp" alt="Vietname" />
        </section>
        <section id="section-6" className={styles.container__couple}>
          <img src="/img/graphic/vietname/print/print-6.1.webp" alt="Vietname" />
          <img src="/img/graphic/vietname/print/print-6.2.webp" alt="Vietname" />
        </section>
        <section id="section-7" className={styles.container__single}>
          <img src="/img/graphic/vietname/print/print-7.webp" alt="Vietname" />
        </section>
      </div>

      <div className={styles.timeline}>
        <div className={styles.scroller}>
          <p>[<span>Drag</span>]</p>
        </div>
      </div>
    </div>
  );
}
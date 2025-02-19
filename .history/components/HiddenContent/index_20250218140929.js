import { useEffect } from "react";
import gsap from "gsap";
import styles from "./HiddenContent.module.css";

export default function HiddenContent() {
  useEffect(() => {
    console.clear();
    const content = document.querySelector("." + styles.content);
    const link = document.querySelector("." + styles.link);
    const linkIcon = document.querySelector("." + styles.btnIcon);
    let linkAnimated = false;

    let xTo = gsap.quickTo("." + styles.hiddenContent, "--x", {
        duration: 0.4,
        ease: "power4.out"
      }),
      yTo = gsap.quickTo("." + styles.hiddenContent, "--y", {
        duration: 0.4,
        ease: "power4.out"
      });

    let tl = gsap.timeline({ paused: true });
    tl.to("." + styles.hiddenContent, {
      "--size": 250,
      duration: 0.75,
      ease: "back.out(1.7)"
    });

    let hoveringContent = gsap.utils.toArray("p", content);
    hoveringContent.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        tl.restart();
      });
      el.addEventListener("mouseleave", () => {
        tl.reverse();
      });
    });

    let btnTl = gsap.timeline({ paused: true });
    btnTl.to("." + styles.hiddenContent, {
      "--size": 20,
      duration: 0.75,
      ease: "back.out(1.7)"
    });

    link.addEventListener("mouseenter", (e) => {
      linkAnimated = true;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let iconRect = linkIcon.getBoundingClientRect();
      let centerX = iconRect.left + iconRect.width / 2;
      let centerY = iconRect.top + iconRect.height / 2 + scrollTop;

      yTo(centerY);
      xTo(centerX);
      btnTl.restart();
    });

    link.addEventListener("mouseleave", () => {
      linkAnimated = false;
      btnTl.reverse();
    });

    window.addEventListener("mousemove", onFirstMove);

    function onFirstMove(e) {
      window.removeEventListener("mousemove", onFirstMove);
      gsap.set("." + styles.hiddenContent, { autoAlpha: 1, "--x": e.pageX, "--y": e.pageY });

      window.addEventListener("mousemove", (e) => {
        if (!linkAnimated) {
          yTo(e.pageY);
          xTo(e.pageX);
        }
      });
    }

    gsap.set("." + styles.hiddenContent, {
      autoAlpha: 1,
      "--x": window.innerWidth / 3,
      "--y": window.innerHeight / 2
    });
    tl.progress(0.2);
  }, []);

  return (
    <div className={styles.bg}>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col}>
              <p className={styles.text}>Have you ever noticed that cats have a peculiar fascination with keyboards?</p>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <p className={styles.text}>Do not share this information with anyone</p>
            </div>
          </div>
          <div className={styles.textCenter}>
            <a
              className={styles.link}
              href="https://greensock.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>psst discover more</span>
              <i className={styles.btnIcon}></i>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.hiddenContent}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col}>
              <p className={styles.text}>I am convinced that cats secretly control the Internet.</p>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <p className={styles.text}>especially not with the cats!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

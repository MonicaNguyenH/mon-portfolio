import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import HeaderArea from "@/components/HeadArea";
import TypingText from "@/components/TypingText";
import ButtonFilledBlack from "@/components/ButtonFilledBlack";
import ButtonFilledWhite from "@/components/ButtonFilledWhite";
import ToolTipButton from "@/components/ToolTipButton";
import Marquee from "@/components/Marquee";
import CardImgSquare from "@/components/CardImgSquare";


export default function Home() {

  const audioRef = useRef(null);
  
  const playSound = () => {
      if (audioRef.current) {
          audioRef.current.currentTime = 0; 
          audioRef.current.play().catch(error => console.log("Audio playback error:", error));
      }
  };

  useEffect(() => {
    async function loadGSAP() {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");

      const { default: gsap } = gsapModule;
      const { ScrollTrigger } = ScrollTriggerModule;

      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        animation: gsap.from(".logo", {
          y: "50vh",
          scale: 8,
          yPercent: -50,
        }), 
          scrub: true,
          trigger: ".content",
          start: "top bottom",
          endTrigger: ".content",
          end: "top center",
      });
    }

    loadGSAP();
  }, []);

  return (
    <>
      <HeaderArea title="Monica Nguyen" description="Monica Nguyen"/>
      <div className={styles.blendingMode}>
        <main className={styles.main}>

          <div className={styles.nav}>
            <div className={styles.items_left}>
              <Link href="/work">Work</Link>
              <Link href="#">Gallery</Link>
            </div>
            <div className={styles.items_right}>
              <Link href="#">About</Link>
              <Link href="#">Contact</Link>
            </div>
          </div>

          <div className={styles.logo_container}>
            <a href="/">
              <img 
                className={`${styles.logo} logo`}  
                src="/img/mon-logo-white.svg" 
                alt="mon. logo" 
                onMouseEnter={playSound}
              />
            </a>
          </div>

          <div className={styles.container}></div>

          <div className={`${styles.content} content`}>
            <div className={styles.landing__sec1}>
              <div className={styles.sec1__hello}>
                <h1>Xin chao 👋, I'm</h1>
                <img src="/img/landing/landing-monica-nguyen.svg" alt="monica nguyen" />
              </div>
              <div className={styles.sec2__button}>
                <TypingText />
                <div className={styles.button}>
                  <ButtonFilledBlack href="/#">
                    Featured work
                  </ButtonFilledBlack> 
                </div>
              </div>
            </div>

            <div className={styles.landing__sec2}>
              <div className={styles.sec2__tooltips}>
                <p className={styles.text}>
                  Digital Designer & Frontend Developer, <ToolTipButton text="bcit" tooltipText="Digital Design and Development" /> graduate.
                </p>
                <p className={styles.text}>
                  Experienced in <ToolTipButton text="Digital Design" tooltipText="Photoshop | Illustrator | InDesign" />,
                  <ToolTipButton text="Product Design" tooltipText="Figma | Wireframing | Usability Testing" />, and
                  <ToolTipButton text="Frontend Development" tooltipText="HTML5 | CSS3 | Next.js | React" />.
                </p>
                <p className={styles.text}>
                  I bring ideas to life with bold, creative designs that don’t just look good—they feel good.
                </p>
              </div>
            </div>

            <div className={styles.marquee}>
              <Marquee />
            </div>

            <div className={styles.featured}>
              <div className={styles.gridContainer}>
                <CardImgSquare link="/work/beep" image="/img/graphic/beep/TN.webp" title="BEEP" description="Smart Safety & Real-Time Awareness" />
                <CardImgSquare link="/work/vietname" image="/img/graphic/vietname/cover.webp" title="VIETNAME" description="Vietnamese Architecture and Cultural Heritage" />
                <div className={styles.gridContainer__filterGrid}></div>
                <CardImgSquare link="/work/forelsket" image="/img/graphic/menu/TN.png" title="FORELSKET" description="A modern, structured restaurant menu design" />
              </div>
              <ButtonFilledWhite href="/work">
                View more
              </ButtonFilledWhite> 
            </div>
          </div>

        </main>

        <footer className={styles.footer}>
          
        </footer>
      </div>

      <audio ref={audioRef} src="/audio/duck-soundeffect.mov" preload="auto"></audio>
    </>
  );
}

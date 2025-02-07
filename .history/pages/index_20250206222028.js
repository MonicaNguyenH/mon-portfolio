import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import HeaderArea from "@/components/HeadArea";

export default function Home() {
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
      <div>
        <main className={styles.main}>

          <div className={styles.nav}>
            <div className={styles.items_left}>
              <a href="#">Work</a>
              <a href="#">Gallery</a>
            </div>
            <div className={styles.items_right}>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
          </div>

          <div className={styles.logo_container}>
            <img className={`${styles.logo} logo`}  src="/img/mon-logo.svg" alt="mon. logo" />
          </div>

          <div className={styles.container}></div>

          <div className={`${styles.content} content`}>
            <div className={styles.landing__sec1}>
              <div className={styles.sec1__hello}>
                <h1>Xin chao 👋, I'm</h1>
                <img src="/img/landing/landing-monica-nguyen.svg" alt="monica nguyen" />
              </div>
            </div>
          </div>

        </main>

        <footer className={styles.footer}>
          
        </footer>
      </div>
    </>
  );
}

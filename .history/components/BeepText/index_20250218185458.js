import styles from './BeepText.module.css';
import gsap from 'gsap';


export default function BeepText() {
    gsap.config({ trialWarn: false });
console.clear();
gsap.registerPlugin(ScrollTrigger, SplitText);
const split = new SplitText("p", { type: "lines" });

split.lines.forEach((target) => {
  gsap.to(target, {
    backgroundPositionX: 0,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      markers: true,
      scrub: 1,
      start: "top center",
      end: "bottom center"
    }
  });
});
    return (
        <>
            <div className={styles.text}>
                <p>BEEEEEEE</p>
                <p>EP</p>
            </div>
        </>
    )
}
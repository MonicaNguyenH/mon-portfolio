import styles from "./ProjectHeaderSC.module.css";

export default function ProjectHeader( { name, description, img, introduction, tools, date } ) {

    // const description = ["DEVELOPMENT", "GRAPHIC DESIGN", "UX/UI DESIGN", "MOTION GRAPHIC"];

    class Button {
        constructor(buttonElement) {
          this.block = buttonElement;
          this.init();
          this.initEvents();
        }
      
        init() {
          const el = gsap.utils.selector(this.block);
      
          this.DOM = {
            button: this.block,
            flair: el(".button__flair")
          };
      
          this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
          this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
        }
      
        getXY(e) {
          const {
            left,
            top,
            width,
            height
          } = this.DOM.button.getBoundingClientRect();
      
          const xTransformer = gsap.utils.pipe(
            gsap.utils.mapRange(0, width, 0, 100),
            gsap.utils.clamp(0, 100)
          );
      
          const yTransformer = gsap.utils.pipe(
            gsap.utils.mapRange(0, height, 0, 100),
            gsap.utils.clamp(0, 100)
          );
      
          return {
            x: xTransformer(e.clientX - left),
            y: yTransformer(e.clientY - top)
          };
        }
      
        initEvents() {
          this.DOM.button.addEventListener("mouseenter", (e) => {
            const { x, y } = this.getXY(e);
      
            this.xSet(x);
            this.ySet(y);
      
            gsap.to(this.DOM.flair, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
          });
      
          this.DOM.button.addEventListener("mouseleave", (e) => {
            const { x, y } = this.getXY(e);
      
            gsap.killTweensOf(this.DOM.flair);
      
            gsap.to(this.DOM.flair, {
              xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
              yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
              scale: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
      
          this.DOM.button.addEventListener("mousemove", (e) => {
            const { x, y } = this.getXY(e);
      
            gsap.to(this.DOM.flair, {
              xPercent: x,
              yPercent: y,
              duration: 0.4,
              ease: "power2"
            });
          });
        }
      }
      
      const buttonElements = document.querySelectorAll('[data-block="button"]');
      
      buttonElements.forEach((buttonElement) => {
        new Button(buttonElement);
      });

    return (
        <>
            <div className={styles.main}>
                <h1>{name}</h1>
                <p>{description}</p>
                <img src={img} alt={name} />
                <div className={styles.intro}>
                    <p>{introduction}</p>
                    <button>

                    </button>
                    <div className={styles.intro__detail}>
                        <div className={styles.detail__toolsContainer}>
                            {tools.map((tool, index) => (
                                <p key={index} className={styles.detail__tool}>{tool}</p>
                            ))}
                        </div>
                        <p className={styles.detail__date}>{date}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
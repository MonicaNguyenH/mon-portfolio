import styles from './String.module.css';
import gsap from 'gsap';
import styles from './String.module.css';
import { useEffect, useRef } from 'react';

export default function String() {
    const containerRef = useRef(null);
    // const pathRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const path = `M 10 100 Q 500 100 990 100`;
        const finalPath = `M 10 100 Q 500 100 990 100`;

        const handleMouseMove = (event) => {
            const { offsetX, offsetY } = event;
            const newPath = `M 10 100 Q 500 ${offsetX} ${offsetY} 990 100`;

            gsap.to(path, {
                attr: { d: newPath },
                duration: 0.3,
                ease: "power3.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(path, {
                attr: { d: finalPath }, 
                duration: 1.5,
                ease: "elastic.out(1,0.2)"
            })
        };

        if(container) {
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (container) {
                container.removeEventListener("mousemove", handleMouseMove);
                container.removeEventListener("mouseleave", handleMouseLeave);
            }
        }
    }, []);


    return (
        <>
            <div className={styles.string}>
                <svg width="1000" height="200" className={styles.svg}>
                    <path d="M 10 100 Q 500 100 990 100" stroke="var(--white)" fill="transparent"/>
                </svg>
            </div>

            {/* <script 
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
                integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" 
                crossorigin="anonymous" 
                referrerpolicy="no-referrer">
            </script> */}
        </>
    )
}

// const path = `M 10 100 Q 500 100 990 100`;

// const finalPath = `M 10 100 Q 500 100 990 100`;

// // const initialPath = `M 10 100 Q 250 100 490 100`;

// const string = document.querySelector(".string");

// string.addEventListener("mousemove", function(dets) {
//     path = `M 10 100 Q 500 ${dets.x} ${dets.y} 990 100`;

//     gsap.to("svg path", {
//         attr: { d:path },
//         durration: 0.3,
//         ease: "power3.out"
//     });
// })

// string.addEventListener("mouseleave", function() {
//     gsap.to("svg path", {
//         attr: { d:finalPath },
//         duration: 1.5,
//         ease: "elastic.out(1,0.2)"
//     });
// })
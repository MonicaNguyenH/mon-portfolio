import styles from './String.module.css'
import gsap from 'gsap';

export default function String() {
    const initialPath = `M 10 100 Q 250 100 490 100`;

    const finalPath = `M 10 100 Q 250 100 490 100`;

    const string = document.querySelector(".string");

    string.addEventListener("mouseenter", function() {
        console.log("entered")
    })

    string.addEventListener("mouseleave", function() {
        console.log("left")
    })


    return (
        <>
            <div className={styles.string}>
                <svg width="1000" height="200" className={styles.svg}>
                    <path d="M 10 100 Q 250 100 490 100" stroke="var(--white)" fill="transparent"/>
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
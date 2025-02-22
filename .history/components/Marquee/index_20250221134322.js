import styles from './Marquee.module.css'
import { useState, useEffect, useRef } from "react"

export default function Marquee() {

    window.addEventListener("wheel", function(dets) {
        console.log(dets.deltaY)
    })

    return (
        <>
            <div className={styles.main}>
                <div className={styles.page1}>

                </div>

                <div className={styles.page2}>
                    <div className={styles.move}>
                        <div className={styles.marquee}>
                            <h1>I DESIGN</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={styles.marquee}>
                            <h1>I CODE</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={styles.marquee}>
                            <h1>I CREATE</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={styles.marquee}>
                            <h1>PERIOD.</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>

                        <div className={styles.marquee}>
                            <h1>I DESIGN</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={styles.marquee}>
                            <h1>I CODE</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={styles.marquee}>
                            <h1>I CREATE</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        <div className={styles.marquee}>
                            <h1>PERIOD.</h1>
                            <img src="/img/arrow.svg" alt="Arrow graphic" />
                        </div>
                        
                    </div>
                </div>

                <div className={styles.page3}>

                </div>
            </div>
        </>
    )
}
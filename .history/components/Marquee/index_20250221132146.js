import styles from './Marquee.module.css'
import { useState, useEffect, useRef } from "react"

export default function Marquee() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.page1}>

                </div>

                <div className={styles.page2}>
                    <div className={styles.move}>
                        <div className={styles.marquee}>
                            <h1>I DESIGN</h1>
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>

                <div className={styles.page3}>

                </div>
            </div>
        </>
    )
}
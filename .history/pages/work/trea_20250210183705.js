import { useState } from "react"
import HeaderArea from "@/components/HeadArea"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import ProjectHeader from "@/components/ProjectHeader"
import styles from "@/styles/Trea.module.css"


export default function Trea() {
    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];

    return (
        <>
            <HeaderArea title="Trea" description="Trea"/>

            <NavBar />

            <div className={styles.main}>
                <ProjectHeader 
                    name="Trea" 
                    description="GRAPHIC DESIGN" 
                    img="/img/graphic/trea/cover.webp" 
                    introduction="Trea is a black tea brand that blends bold flavors with modern design. Infused with Peach, Strawberry, and Mango, it caters to young professionals and trend-conscious consumers who appreciate quality and aesthetics. The halftone fruit textures highlight freshness and energy, reflecting Trea’s focus on contemporary branding and natural ingredients. With a sleek, vibrant look, Trea transforms tea into a stylish, everyday essential."
                    tools={projectTools}
                    date="Oct 2024"
                />

                <img  src="/img/graphic/trea/Peach1.webp" alt="Peach" className={styles.displayImg} />
                <img src="/img/graphic/trea/Peach.webp" alt="Peach" className={styles.displayImg} />

                <img src="/img/graphic/trea/Strawberry1.webp" alt="Strawberry" className={styles.displayImg} />
                <img src="/img/graphic/trea/Strawberry.webp" alt="Strawberry" className={styles.displayImg} />

                <img src="/img/graphic/trea/Mango1.webp" alt="Mango" className={styles.displayImg} />
                <img src="/img/graphic/trea/Mango.webp" alt="Mango" className={styles.displayImg} />


            </div>
            
            <Footer />
        </>
    )
}
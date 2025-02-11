import HeaderArea from "@/components/HeadArea";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProjectHeader from "@/components/ProjectHeader";
import styles from "@/styles/Millenova.module.css";

export default function Millenova() {
    const projectTools = ["Adobe Photoshop", "Adobe Illustrator"];

    return (
        <>
            <HeaderArea title="Millenova" description="Millenova"/>

            <NavBar />

            <div className={styles.main}>
                <ProjectHeader 
                    name="Millenova" 
                    description="GRAPHIC DESIGN" 
                    img="/img/graphic/trea/cover.webp" 
                    introduction="The Millenova exhibition poster draws inspiration from Dior's SS 2000 campaign, reinterpreted with bold visuals and innovative techniques. It creates a piece that reflects the era's timeless influence—colorful, innovative, and unapologetically bold. Perfect for showcasing how design connects past trends with today's culture and celebrates the 2000s' lasting impact on contemporary fashion."
                    tools={projectTools}
                    date="Sept 2024"
                />

                <img  src="/img/graphic/millenova/2ver.webp" alt="Millenova versions" className={styles.img} />


            </div>

            <Footer />
        </>
    )
}
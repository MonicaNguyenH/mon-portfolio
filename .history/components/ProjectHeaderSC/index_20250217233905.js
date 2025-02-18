import styles from "./ProjectHeaderSC.module.css";

export default function ProjectHeader( { name, description, img, introduction, tools, date } ) {

    // const description = ["DEVELOPMENT", "GRAPHIC DESIGN", "UX/UI DESIGN", "MOTION GRAPHIC"];

    return (
        <>
            <div className={styles.main}>
                <h1>{name}</h1>
                <p>{description}</p>
                <img src={img} alt={name} />
                <div className={styles.intro}>
                    <p>{introduction}</p>
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
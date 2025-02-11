import { styleText } from "util";

export default function ProjectHeader( name, description, img ) {
    return (
        <>
            <div className={styles.main}>
                <h1>{name}</h1>
                <p>{description}</p>
                <img src={img} alt={name} />
            </div>
        </>
    )
}
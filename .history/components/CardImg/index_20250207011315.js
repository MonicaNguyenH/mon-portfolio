import styles from './CardImg.module.css';
import Link from 'next/link';

export default function Card({ link = "#", image, title, year, gridSize }) {
    return (
        <div className={`${styles.card} ${styles[gridSize]}`}>
            <Link href={link} passHref >
                <img src={image} alt={title} className={styles.card__image} />
                <div className={styles.card__overlay}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.year}>{year}</p>
                </div>
            </Link>
        </div>
    );
}

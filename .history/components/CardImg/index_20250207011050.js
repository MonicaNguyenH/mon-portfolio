import styles from './CardImg.module.css';
import Link from 'next/link';

export default function Card({ link = "#", image, title, year, gridSize }) {
    return (
      <Link href={link} passHref className={styles.card}>
        <div className={`${styles.card} ${styles[gridSize]}`}>
          <img src={image} alt={title} className={styles.card__image} />
          <div className={styles.card__overlay}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.year}>{year}</p>
          </div>
        </div>
      </Link>
    );
}

import styles from './CardImgSquare.module.css';
import Link from 'next/link';

export default function CardImgSquare ({ link = "#", image, title, description }) {
    return (
        <div className={`${styles.card}`}>
            <Link href={link} passHref >
                <img src={image} alt={title} className={styles.card__image} />
                <div className={styles.card__overlay}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{description}</p>
                </div>
            </Link>
        </div>
    );
}

import styles from './CardImg.module.css';

export default function Card({ image, title, year }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.overlay}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.year}>{year}</p>
      </div>
    </div>
  );
}

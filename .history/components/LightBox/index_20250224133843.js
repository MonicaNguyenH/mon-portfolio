import styles from './LightBox.module.css';
import gsap from 'gsap';

export default function LightBox() {
    const items = document.querySelectorAll(".item");
    const container = document.querySelectorAll(".item");
    const numberOfItems = items.length;
    const angleIncrement = (2 * Math.PI) / numberOfItems;
    const radius = 300;
    let isGalleryOpen = false;

    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    const tl = gsap.timeline();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.gallery}>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                    <div className={styles.item}></div>
                </div>
            </div>
        </>
    )
}
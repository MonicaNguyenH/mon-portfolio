import styles from './NavBar.module.css';

export default function NavBar() {
    return (
        <>
            <div className={styles.nav}>
                <div className={styles.items_left}>
                    <a href="#">Work</a>
                    <a href="#">Gallery</a>
                </div>
                <div className="logo">
                    <img className="logo" src="/img/mon-logo.svg" alt="mon logo" width={80} height={34}/>
                </div>
                <div className={styles.items_right}>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
            </div>
        </>
    )
};
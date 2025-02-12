import styles from './String.module.css'

export default function String() {
    return (
        <>
            <div className={styles.string}>
                <svg width="500" height="160" className={styles.svg}>
                    <path d="M 10 80 Q 250 10 490 80" stroke="var(--white)" fill="transparent"/>
                </svg>
            </div>
        </>
    )
}
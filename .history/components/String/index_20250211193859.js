import styles from './String.module.css'

export default function String() {
    return (
        <>
            <div className={styles.string}>
                <svg width="190" height="160">
                    <path d="M 10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>
                </svg>
            </div>
        </>
    )
}
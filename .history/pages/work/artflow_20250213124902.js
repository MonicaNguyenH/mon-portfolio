import MenuOverlay from "@/components/MenuOverlay"
import styles from '@/styles/Artflow.module.css'

export default function Artflow() {
    return (
        <>
        <div className={styles.blendingMode}>
            <MenuOverlay />
        </div>
        </>
    )
}
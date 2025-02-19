import MenuOverlay from "@/components/MenuOverlay";
import styles from '@/styles/Artflow.module.css';
import HiddenContent from "@/components/HiddenContent"

export default function Artflow() {
    return (
        <>
        <div className={styles.blendingMode}>
            <HiddenContent />
        </div>
        </>
    )
}
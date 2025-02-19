import MenuOverlay from "@/components/MenuOverlay";
import styles from '@/styles/Artflow.module.css';
import BeepText from "@/components/BeepText";

export default function Artflow() {
    return (
        <>
        <div className={styles.blendingMode}>
            <BeepText />
        </div>
        </>
    )
}
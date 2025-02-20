import MenuOverlay from "@/components/MenuOverlay";
import styles from '@/styles/Artflow.module.css';
import HiddenContent from '@/components/HiddenContent';

export default function Artflow() {
    return (
        <>
        <div className={styles.blendingMode}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "1005" }}>
                <HiddenContent 
                    imgFront="/img/graphic/beep/overview-2.png" 
                    imgBack="/img/graphic/beep/overview-1.png" 
                />
            </div>
        </div>
        </>
    )
}
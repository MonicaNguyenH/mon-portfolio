import styles from '@/styles/Forelsket.module.css';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Forelsket () {
    const [selectedFilter, setSelectedFilter] = useState("DEVELOPMENT");

    return (
        <>
            <div className={styles.blendingMode}>

            </div>
        </>
    )
}
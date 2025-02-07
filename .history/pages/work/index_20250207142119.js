import styles from '@/styles/Work.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import WorkFilter from '@/components/WorkFilter';
import Card from '@/components/CardImg';

export default function Work() {
    const [selectedFilter, setSelectedFilter] = useState("DEVELOPMENT");

    // Content for each filter
    const content = {
        DEVELOPMENT: (
            <div className={styles.gridContainer}>
                    <Card link="/work/beep" image="/img/graphic/beep/TN.png" title="BEEP" year="2024" gridSize="wide" />
                    <Card link="/work/artflow" image="/img/graphic/artflow/TN.png" title="Artflow" year="2024" gridSize="wide" />
            </div>
        ),
        "GRAPHIC DESIGN": (
            <div className={styles.gridContainer}>
                    <Card link="/work/trea" image="/img/graphic/trea/cover.webp" title="TREA" year="2024" gridSize="wide" />
                    <Card link="/work/vietname" image="/img/graphic/vietname/cover.webp" title="VIETNAME" year="2024" gridSize="small" />
                    <Card link="/work/forelsket" image="/img/graphic/menu/TN.png" title="FORELSKET" year="2024" gridSize="small" />

                    <Card link="/work/millenova" image="/img/graphic/millenova/cover.webp" title="MILLENOVA" year="2024" gridSize="small" />
                    <Card link="/work/forelsket" image="/img/graphic/lalaland/TN.webp" title="LALALAND" year="2024" gridSize="small" />
                    <Card link="/work/forelsket" image="/img/graphic/object/cover.webp" title="ELECTRICAL DEVICE" year="2023" gridSize="wide" />

                    <Card link="/work/forelsket" image="/img/graphic/book/cover.webp" title="THE STARFRUIT TREE" year="2024" gridSize="wide" />
            </div>
        ),
        "UX/UI DESIGN": (
            <></>
        ),
        "MOTION GRAPHIC": (
            <></>
        ),
    };

    return(
        <>
            <HeaderArea title="Monica Nguyen" description="Monica Nguyen's Work"/>
            <NavBar />

            <div className={styles.mainContainer}>
                <div className={styles.header}>
                    <div className={styles.header__caption}>
                        <img className={styles.caption__img} src="/img/work/work-header.svg" alt="work caption" />
                    </div>
                    <div className={styles.header__filter}>
                        <WorkFilter onSelect={setSelectedFilter}/>
                    </div>
                </div>
                <div className="content-box">{content[selectedFilter]}</div>
            </div>
        </>
    )
}


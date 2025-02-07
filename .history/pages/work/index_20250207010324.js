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
                <Link href="/work/beep" passHref>
                    <Card image="/img/graphic/beep/TN.png" title="BEEP" year="2024" gridSize="wide" />
                </Link>
                <Link href="/work/artflow" passHref>
                    <Card image="/img/graphic/artflow/TN.png" title="Artflow" year="2024" gridSize="wide" />
                </Link> 

                <Card link="work/artflow" image="/img/graphic/artflow/TN.png" title="Artflow" year="2024" gridSize="wide" />
            </div>
        ),
        "GRAPHIC DESIGN": (
            <></>
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


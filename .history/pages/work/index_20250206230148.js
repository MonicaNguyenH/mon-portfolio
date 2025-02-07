import styles from '@/styles/Work.module.css';
import { useState, useEffect } from 'react';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import WorkFilter from '@/components/WorkFilter';

export default function Work() {
    const [selectedFilter, setSelectedFilter] = useState("DEVELOPMENT");

    return(
        <>
            <HeaderArea title="Monica Nguyen" description="Monica Nguyen's Work"/>
            <NavBar />

            <div className={styles.header}>
                <div className={styles.header__caption}>
                    <img className={styles.caption__img} src="/img/work/work-header.svg" alt="work caption" />
                </div>
                <div className={styles.header__filter}>
                    <WorkFilter onSelect={setSelectedFilter}/>

                    {/* Display selected filter */}
                    <p className="selected-text">
                        Selected: <span className="highlight">{selectedFilter}</span>
                    </p>
                </div>

            </div>
        </>
    )
}


import styles from '@/styles/Work.module.css';
import { useEffect } from 'react';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';

export default function Work() {
    return(
        <>
            <HeaderArea title="Monica Nguyen" description="Monica Nguyen's Work"/>
            <NavBar />

            <div className={styles.header}>
                <div className={styles.header__caption}>
                    <img className={styles.caption__img} src="/img/work/work-header.svg" alt="work caption" />
                </div>
                <div>
                    
                </div>

            </div>
        </>
    )
}


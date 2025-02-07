import styles from '@/styles/Work.module.css';
import { useEffect } from 'react';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';

export default function Work() {
    return(
        <>
            <HeaderArea title="Monica Nguyen" description="Monica Nguyen's Work"/>
            <NavBar />

            <div className={styles.container}>

            </div>
        </>
    )
}


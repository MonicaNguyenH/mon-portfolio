import styles from '@/styles/Work.module.css';
import { useState, useEffect } from 'react';
import HeaderArea from '@/components/HeadArea';
import NavBar from '@/components/NavBar';
import WorkFilter from '@/components/WorkFilter';

export default function Work() {
    const [selectedFilter, setSelectedFilter] = useState("DEVELOPMENT");

    // Content for each filter
    const content = {
        DEVELOPMENT: (
        <p>
            🖥️ **Development**: Learn about coding, frontend/backend technologies, and best practices for web and app development.
        </p>
        ),
        "GRAPHIC DESIGN": (
        <p>
            🎨 **Graphic Design**: Explore visual creativity, branding, typography, and the latest trends in graphic design.
        </p>
        ),
        "UX/UI DESIGN": (
        <p>
            📱 **UX/UI Design**: Enhance user experiences with usability-focused interfaces and stunning web/app designs.
        </p>
        ),
        "MOTION GRAPHIC": (
        <p>
            🎬 **Motion Graphics**: Create engaging animations and video effects for storytelling and digital branding.
        </p>
        ),
    };

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
                    <div className="content-box">{content[selectedFilter]}</div>
                </div>

            </div>
        </>
    )
}


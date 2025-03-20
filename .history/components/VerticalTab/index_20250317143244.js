import { useState } from 'react';
import styles from './VerticalTab.module.css';

const VerticalTab = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: 'Poetry',
      content: 'Content for Poetry goes here...',
    },
    {
      title: 'Dramaturgy',
      content: 'Content for Dramaturgy goes here...',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
            onClick={() => setActiveTab(index)}
          >
            <span className={styles.tabTitle}>{tab.title}</span>
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default VerticalTab;
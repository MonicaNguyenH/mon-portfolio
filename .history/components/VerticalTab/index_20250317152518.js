import { useState } from 'react';
import styles from './VerticalTab.module.css';

const VerticalTab = () => {
  const [activeTab, setActiveTab] = useState(null);

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
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
          onClick={() => setActiveTab(activeTab === index ? null : index)}
        >
          <div className={styles.tabSpine}>
            <span>{tab.title}</span>
          </div>
          <div className={styles.tabContent}>
            <div className={styles.contentInner}>
              {tab.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalTab;
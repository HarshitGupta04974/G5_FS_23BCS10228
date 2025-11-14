import React from 'react';
import styles from './TabBar.module.css';



const tabs = [
  { id: 'habits', label: 'My Habits' /* icon: <FaTasks /> */ },
  { id: 'calendar', label: 'Calendar' /* icon: <FaCalendarAlt /> */ },
  { id: 'stats', label: 'Stats' /* icon: <FaChartBar /> */ },
  { id: 'badges', label: 'Badges' /* icon: <FaMedal /> */ },
];

const TabBar = ({ activeTab, onTabClick }) => {
  return (
    <nav className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${
            activeTab === tab.id ? styles.active : ''
          }`}
          onClick={() => onTabClick(tab.id)}
        >
          {/* tab.icon */}
          <span className={styles.label}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default TabBar;
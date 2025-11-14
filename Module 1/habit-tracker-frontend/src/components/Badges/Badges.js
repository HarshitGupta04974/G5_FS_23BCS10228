import React, { useMemo } from 'react';
import styles from './Badges.module.css';
import { FaCheckCircle, FaStar, FaFire, FaTrophy, FaCalendarCheck, FaLock } from 'react-icons/fa';


const allBadges = [
  {
    key: 'STREAK_5',
    icon: <FaFire />,
    title: 'On Fire!',
    description: 'Complete a 5-day streak.'
  },
  {
    key: 'PERFECT_WEEK',
    icon: <FaCalendarCheck />,
    title: 'Perfect Week',
    description: 'Complete all habits for 7 days in a row.'
  },
  {
    key: 'LEVEL_5',
    icon: <FaStar />,
    title: 'Level 5',
    description: 'Reach Level 5.'
  },
  {
    key: 'FIRST_HABIT',
    icon: <FaCheckCircle />,
    title: 'Way to Go!',
    description: 'Complete your first habit.'
  },
  {
    key: 'LEVEL_10',
    icon: <FaTrophy />,
    title: 'Level 10',
    description: 'Reach Level 10.'
  },
];


function Badges({ user }) {

  const userBadgeKeys = user.badges || [];

  return (
    <div className={styles.badgesContainer}>
      <h2>Your Badges</h2>
      <div className={styles.badgeGrid}>
        {allBadges.map((badge) => {
          const isUnlocked = userBadgeKeys.includes(badge.key);

          const itemClasses = `${styles.badgeItem} ${isUnlocked ? styles.unlocked : ''}`;

          return (
            <div key={badge.key} className={itemClasses}>
              <div className={styles.badgeIcon}>
                {isUnlocked ? badge.icon : <FaLock />}
              </div>
              <h4 className={styles.badgeTitle}>{badge.title}</h4>
              <p className={styles.badgeDescription}>{badge.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Badges;
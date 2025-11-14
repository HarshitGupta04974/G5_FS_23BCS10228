import React from 'react';
import styles from './Hero.module.css';
import { FaSignOutAlt } from 'react-icons/fa'; 


const Hero = ({ user, habits, onLogout }) => {
  
  // Calculate stats
  const activeHabits = Array.isArray(habits) ? habits.length : 0;
  const badgesEarned = (user && Array.isArray(user.badges)) ? user.badges.length : 0;

  return (
    <header className={styles.heroContainer}>

      <div className={styles.textSection}>
       
        <div className={styles.profileHeader}>
          {user.imageUrl ? (
            <img src={user.imageUrl} alt={user.username} className={styles.profileImage} />
          ) : (
            <div className={styles.profileImagePlaceholder} />
          )}
          <h1 className={styles.title}>
            Welcome back,<br />
            <span className={styles.gradientText}>{user.username}</span>
          </h1>
        </div>
        
        <p className={styles.subtitle}>
          Track your habits, build powerful streaks, and earn badges as you transform
          your daily routine into a path to success.
        </p>
        
       
        <div className={styles.stats}>
          <span><strong>{activeHabits}</strong> Active Habits</span>
          <span><strong>{badgesEarned}</strong> Badges Earned</span>
        </div>
      </div>

      <div className={styles.imageSection}>

        <div className={styles.imagePlaceholder}>
          Illustration
        </div>
        

        <button onClick={onLogout} className={styles.logoutButton}>
          <FaSignOutAlt /> Log Out
        </button>
      </div>
    </header>
  );
};

export default Hero;
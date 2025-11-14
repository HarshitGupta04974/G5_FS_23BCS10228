import React, { useState, useEffect } from 'react';
import * as api from '../../api/apiService';
import styles from './Dashboard.module.css';
import HabitCalendar from '../Calendar/HabitCalendar';

function Dashboard({ user, setUser, onLogout }) { 


  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitXp, setNewHabitXp] = useState(10);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Data Fetching ---
  const fetchHabits = async () => {
    try {
  
      const data = await api.getHabitsForUser(user.id);
      

      if (Array.isArray(data)) {
        setHabits(data);
      } else {
        setHabits([]);
      }
      
    } catch (err) {
      setError(err.message);
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      setLoading(true);
      fetchHabits();
    }
  }, [user.id]);


  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return; 
    setError(null);

    try {

      const newHabitData = { name: newHabitName, xp: newHabitXp };
      const createdHabit = await api.createHabit(user.id, newHabitData);
 
      setHabits([createdHabit, ...habits]);
     
      
      setNewHabitName(''); 
      setNewHabitXp(10);  // Reset XP input
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCompleteHabit = async (habitId) => {
    setError(null);
    try {
      const updatedUser = await api.completeHabit(habitId);

      setUser(updatedUser); 

      // Optimistically update the local UI for the calendar and streak
      setHabits(habits.map(h => 
        h.id === habitId 
          ? { ...h, 
              streak: h.streak + 1, 
              completionDates: [...(h.completionDates || []), new Date().toISOString().split('T')[0]] 
            }
          : h
      ));

    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteHabit = async (habitId) => {

    setError(null);
    try {
      await api.deleteHabit(habitId);
      setHabits(habits.filter(h => h.id !== habitId));
    } catch (err) {
      setError(err.message);
    }
  };

  // --- JSX RENDER ---

  return (
    <div className={styles.dashboardContainer}>
      {/* Header section with user info and add form */}
      <header className={styles.header}>
        <div className={styles.profileCard}>
          <h3>Welcome, {user.username}!</h3>
          <p>Level: {user.level}</p>
          <p>XP: {user.xp}</p>
          <div className={styles.xpBar}>
            <div 
              className={styles.xpProgress} 
              style={{ width: `${(user.xp % 100)}%` }}
            ></div>
          </div>
          <button onClick={onLogout} className={styles.logoutButton}>Logout</button>
        </div>

        {/* Form to add a new habit, now with XP input */}
        <form onSubmit={handleAddHabit} className={styles.addHabitForm}>
          <h4>Add a New Habit</h4>
          <div className={styles.formGroup}>
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="e.g., Read for 15 minutes"
              className={styles.addInput}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>XP Reward:</label>
            <input
              type="number"
              value={newHabitXp}
              onChange={(e) => setNewHabitXp(parseInt(e.target.value, 10))}
              min="1"
              required
            />
          </div>
          <button type="submit" className={styles.formButton}>Add Habit</button>
        </form>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      {/* --- Main content grid (List + Calendar) --- */}
      <main className={styles.mainGrid}>
        
        {/* Column 1: Habit List */}
        <section className={styles.habitList}>
          <h2>Today's Habits</h2>
          {loading && <p>Loading habits...</p>}
          {!loading && habits.length === 0 && <p>No habits added yet. Add one above!</p>}
          <ul>
            {/* Check if habits is an array before mapping */}
            {Array.isArray(habits) && habits.map(habit => (
              <li key={habit.id} className={styles.habitItem}>
                <div className={styles.habitInfo}>
                  <span className={styles.habitName}>{habit.name}</span>
                  <span className={styles.habitStreak}>🔥 {habit.streak}</span>
                </div>
                <div className={styles.habitActions}>
                  <button onClick={() => handleCompleteHabit(habit.id)} className={styles.completeButton}>Done</button>
                  <button onClick={() => handleDeleteHabit(habit.id)} className={styles.deleteButton}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        
        {/* Column 2: The New Calendar */}
        <aside className={styles.calendarArea}>
          <HabitCalendar habits={habits} />
        </aside>

      </main>
    </div>
  );
}

export default Dashboard;
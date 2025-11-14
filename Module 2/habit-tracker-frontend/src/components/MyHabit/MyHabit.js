import React, { useState } from 'react';
import * as api from '../../api/apiService';
import styles from './MyHabit.module.css';
import { toast } from 'react-toastify';
import { FaPlus, FaCheck, FaFire, FaTrash } from 'react-icons/fa';


function MyHabits({ user, habits, setHabits, setUser }) {
  const [newHabitName, setNewHabitName] = useState('');

  const [newHabitXp, setNewHabitXp] = useState(10); 
  const [error, setError] = useState(null);



  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    setError(null);

    try {
  
      const newHabitData = { name: newHabitName, xpValue: newHabitXp };


      const createdHabit = await api.createHabit(newHabitData);
      
      setHabits([createdHabit, ...habits]);
      setNewHabitName('');
      setNewHabitXp(10);
      toast.success("Habit added!");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to add habit");
    }
  };

  const handleCompleteHabit = async (habitId) => {
    setError(null);
    try {

      const oldXp = user.xp;
      
      const updatedUser = await api.completeHabit(habitId);

      setUser(updatedUser); 

      const oldLevel = Math.floor(oldXp / 100) + 1;
      const newLevel = updatedUser.level; 
      if (newLevel > oldLevel) {
        toast.success(`Level Up! You are now level ${newLevel}!`, {
          autoClose: 5000,
        });
      } else {
        toast.success("Habit completed!");
      }

      // Optimistically update the local UI
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
      toast.error("Failed to complete habit");
    }
  };

  const handleDeleteHabit = async (habitId) => {
    if (!habitId) {
        console.error("Delete failed: habitId is undefined.");
        toast.error("Error: Could not delete habit.");
        return; 
    }
    
    setError(null);
    try {
      await api.deleteHabit(habitId);
      setHabits(habits.filter(h => h.id !== habitId));
      toast.info("Habit deleted");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to delete habit");
    }
  };

  return (
    <div className={styles.myHabitsContainer}>
      {/* --- ADD HABIT CARD --- */}
      <div className={styles.addHabitCard}>
        <form onSubmit={handleAddHabit}>
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Add a new habit..."
            className={styles.addInput}
            required
          />
          <div className={styles.xpInputWrapper}>
            <label>XP:</label>
            <input
              type="number"
              value={newHabitXp}
              onChange={(e) => setNewHabitXp(parseInt(e.target.value, 10))}
              min="1"
              className={styles.xpInput}
              required
            />
          </div>
          <button type="submit" className={styles.addButton}>
            <FaPlus /> Add
          </button>
        </form>
        {error && <div className={styles.error}>{error}</div>}
      </div>

      {/* --- HABIT LIST --- */}
      <div className={styles.habitList}>
        {habits.map(habit => (
          <div key={habit.id} className={styles.habitItem}>
            <button 
              className={styles.completeButton}
              onClick={() => handleCompleteHabit(habit.id)}
            >
              <FaCheck />
            </button>
            <div className={styles.habitInfo}>
              <span className={styles.habitName}>{habit.name}</span>
              <span className={styles.habitStats}>
                <span className={styles.habitStreak}>
                  <FaFire /> {habit.streak}
                </span>
                <span className={styles.habitXp}>

                  + {habit.xpValue} XP
                </span>
              </span>
            </div>
            <button 
              className={styles.deleteButton}
              onClick={() => handleDeleteHabit(habit.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        {habits.length === 0 && (
          <p className={styles.emptyMessage}>Your habit list is empty. Add one to get started!</p>
        )}
      </div>
    </div>
  );
}

export default MyHabits;
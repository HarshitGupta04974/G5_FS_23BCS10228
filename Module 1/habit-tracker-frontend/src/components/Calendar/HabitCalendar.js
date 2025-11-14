import React, { useMemo } from 'react';
import Calendar from 'react-calendar';


import styles from './HabitCalendar.module.css';
import './CalendarLibrary.css'; 
function HabitCalendar({ habits }) {
  

  const completedDays = useMemo(() => {
    const dates = new Set();
   
    if (Array.isArray(habits)) {
      habits.forEach(habit => {
        if (Array.isArray(habit.completionDates)) {
          habit.completionDates.forEach(dateStr => {
         
            const date = new Date(dateStr);
            date.setDate(date.getDate() + 1);
      
            dates.add(date.toISOString().split('T')[0]);
          });
        }
      });
    }
    return dates;
  }, [habits]); 
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (completedDays.has(dateString)) {
        return styles.dayCompleted; 
      }
    }
    return null;
  };

  return (
    <div className={styles.calendarCard}>
      <h3 className={styles.title}>Your Progress Calendar</h3>
      <Calendar
        tileClassName={tileClassName}
        className={styles.calendar} 
      />
      <div className={styles.legend}>
        <span className={styles.legendIndicator}></span>
        Day with at least one habit completed
      </div>
    </div>
  );
}

export default HabitCalendar;
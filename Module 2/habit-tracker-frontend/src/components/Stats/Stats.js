import React, { useMemo } from 'react';
import styles from './Stats.module.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function Stats({ habits }) {


  const monthlyData = useMemo(() => {
    const stats = new Map();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (Array.isArray(habits)) {
      habits.forEach(habit => {
        if (Array.isArray(habit.completionDates)) {
          habit.completionDates.forEach(dateStr => {
            const date = new Date(dateStr);
            date.setDate(date.getDate() + 1); // Fix timezone offset
            
            const monthIndex = date.getMonth(); // 0 = Jan, 1 = Feb, etc.
            const year = date.getFullYear();
            const monthKey = `${year}-${monthIndex}`; // e.g., "2025-10"
            const monthName = monthNames[monthIndex]; // e.g., "Nov"

            if (!stats.has(monthKey)) {
              stats.set(monthKey, { name: `${monthName} ${year}`, completions: 0 });
            }
            stats.get(monthKey).completions += 1;
          });
        }
      });
    }

    return Array.from(stats.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(entry => entry[1]); // Return { name: "Nov 2025", completions: X }

  }, [habits]);

  return (
    <div className={styles.statsContainer}>
      <h3 className={styles.title}>Your Progress Stats</h3>
      
      <div className={styles.chartCard}>
        <h4 className={styles.chartTitle}>Monthly Habit Completions</h4>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyData} // Use the new monthlyData
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#30423e" />
              <XAxis dataKey="name" stroke="#a0a0a0" />
              <YAxis allowDecimals={false} stroke="#a0a0a0" />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1e2d2a', 
                  borderColor: '#30423e',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Bar dataKey="completions" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {monthlyData.length === 0 && (
          <p className={styles.noDataText}>
            Complete some habits to see your stats here!
          </p>
        )}
      </div>
    </div>
  );
}

export default Stats;
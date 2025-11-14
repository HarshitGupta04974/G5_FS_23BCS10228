import React, { useState, useEffect } from 'react';
import styles from './App.css';



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as api from './api/apiService';

// Import Components
import Auth from './components/Auth/Auth'; 
import Hero from './components/Hero/Hero';
import TabBar from './components/TabBar/TabBar';
import MyHabits from './components/MyHabit/MyHabit';
import HabitCalendar from './components/Calendar/HabitCalendar';
import Stats from './components/Stats/Stats';
import Badges from './components/Badges/Badges';

function App() {
  const [user, setUser] = useState(api.getCurrentUser()); 
  const [habits, setHabits] = useState([]);
  const [activeTab, setActiveTab] = useState('habits');
  const [isHabitsLoading, setIsHabitsLoading] = useState(true);

 
  const fetchHabits = async () => {
    if (!user) { 
      setIsHabitsLoading(false);
      return;
    }
    
    setIsHabitsLoading(true);
    try {
      const habitsData = await api.getHabits();
      setHabits(Array.isArray(habitsData) ? habitsData : []);
    } catch (err) {
      console.error("Failed to fetch habits:", err);
      setHabits([]);
    } finally {
      setIsHabitsLoading(false);
    }
  };


  useEffect(() => {
    fetchHabits();
  }, [user]); 

  const handleLogin = (userData) => {
    setUser(userData);
  };
  
  
  const handleLogout = () => {
    api.logout(); 
    setUser(null);
    setHabits([]);
  };

 
  if (!user) {
    return (
      <>
       
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
        />
        <Auth onLogin={handleLogin} />
      </>
    );
  }


  const renderTabContent = () => {
   
    if (isHabitsLoading) {
       return (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading Habits...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'habits':
        return <MyHabits user={user} habits={habits} setHabits={setHabits} setUser={setUser} onHabitsUpdated={fetchHabits} />;
      case 'calendar':
        return <HabitCalendar habits={habits} />;
      case 'stats':
        return <Stats habits={habits} />;
      case 'badges':
        return <Badges user={user} />;
      default:
        return <MyHabits user={user} habits={habits} setHabits={setHabits} setUser={setUser} onHabitsUpdated={fetchHabits} />;
    }
  };

  return (
    <div className={styles.appContainer}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
      />
      
      <Hero user={user} habits={habits} onLogout={handleLogout} />
      <TabBar activeTab={activeTab} onTabClick={setActiveTab} />
      
      <main className={styles.mainContent}>
        {renderTabContent()}
      </main>
    </div>
  );
}

export default App;
export const mockUser = {
    name: 'Alex',
    xp: 750,
    level: 7,
    badges: [
      { name: 'Early Bird', icon: '☀️' },
      { name: 'Perfect Week', icon: '🏆' },
      { name: '10-Day Streak', icon: '🔥' },
    ],
  };
  
  export const mockHabits = [
    { id: 1, name: 'Read for 15 minutes', streak: 12, xp: 20, isCompleted: false },
    { id: 2, name: 'Go for a run', streak: 4, xp: 30, isCompleted: true },
    { id: 3, name: 'Drink 8 glasses of water', streak: 25, xp: 10, isCompleted: false },
    { id: 4, name: 'Meditate for 5 minutes', streak: 0, xp: 15, isCompleted: false },
  ];
  
  export const mockHeatmapData = [
    { date: '2025-09-01', count: 2 }, { date: '2025-09-02', count: 3 },
    { date: '2025-09-03', count: 1 }, { date: '2025-09-06', count: 4 },
    { date: '2025-09-15', count: 5 }, { date: '2025-09-22', count: 2 },
    { date: '2025-10-01', count: 3 }, { date: '2025-10-05', count: 1 },
  ];
  
  export const mockChartData = [
      { name: 'Week 1', habitsCompleted: 15 }, { name: 'Week 2', habitsCompleted: 20 },
      { name: 'Week 3', habitsCompleted: 18 }, { name: 'Week 4', habitsCompleted: 25 },
  ];
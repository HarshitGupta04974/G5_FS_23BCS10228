import React from 'react';
import { List, ListItem, ListItemText, IconButton, Card, CardHeader } from '@mui/material';
import { FaCheck, FaTimes, FaFire } from 'react-icons/fa';
import { toast } from 'react-toastify';

const HabitList = ({ habits, setHabits, setUser }) => {

  const handleCompleteHabit = (id) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === id && !habit.isCompleted) {
        toast.success(`Great job! +${habit.xp} XP! 🎉`);
        setUser(prevUser => ({...prevUser, xp: prevUser.xp + habit.xp}));
        return { ...habit, isCompleted: true, streak: habit.streak + 1 };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  return (
    <Card>
      <CardHeader title="Today's Habits" />
      <List>
        {habits.map((habit) => (
          <ListItem
            key={habit.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleCompleteHabit(habit.id)} disabled={habit.isCompleted}>
                {habit.isCompleted ? <FaCheck color="green" /> : <FaTimes color="gray" />}
              </IconButton>
            }
          >
            <ListItemText
              primary={habit.name}
              secondary={
                <span>
                  <FaFire color="orange" /> Streak: {habit.streak}
                </span>
              }
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default HabitList;
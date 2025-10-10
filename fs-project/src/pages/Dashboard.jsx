import React, { useState } from 'react';
import { Container, Grid, Button } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import HabitList from '../components/HabitList';
import { mockUser, mockHabits } from '../data/mockData';
import { FaPlus } from 'react-icons/fa';

const Dashboard = () => {
  const [user, setUser] = useState(mockUser);
  const [habits, setHabits] = useState(mockHabits);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileCard user={user} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Button variant="contained" startIcon={<FaPlus />} sx={{ mb: 2 }}>
            Add New Habit
          </Button>
          <HabitList habits={habits} setHabits={setHabits} setUser={setUser} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
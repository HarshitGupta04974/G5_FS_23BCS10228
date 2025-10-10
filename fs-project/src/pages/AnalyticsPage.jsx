import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { mockChartData, mockHeatmapData } from '../data/mockData';

const AnalyticsPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Your Progress</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Weekly Habit Completion</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="habitsCompleted" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
             <Typography variant="h6">Habit Heatmap</Typography>
             <CalendarHeatmap
                startDate={new Date('2025-08-31')}
                endDate={new Date('2025-12-31')}
                values={mockHeatmapData}
                classForValue={(value) => {
                    if (!value) { return 'color-empty'; }
                    return `color-scale-${Math.min(value.count, 5)}`;
                }}
             />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsPage;
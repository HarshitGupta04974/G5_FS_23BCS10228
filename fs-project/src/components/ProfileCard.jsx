import React from 'react';
import { Card, CardContent, Typography, Box, Chip, LinearProgress } from '@mui/material';

const ProfileCard = ({ user }) => {
  const progress = (user.xp % 100);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5">Welcome back, {user.name}!</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Level: {user.level}</Typography>
          <Typography variant="body2" color="text.secondary">XP: {user.xp}</Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, my: 1 }} />
          <Typography variant="caption">{100 - (user.xp % 100)} XP to next level</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Badges</Typography>
          {user.badges.map((badge, index) => (
            <Chip key={index} label={`${badge.icon} ${badge.name}`} sx={{ mr: 1, mt: 1 }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
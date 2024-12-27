import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';

interface RatingProgressProps {
  value: number;
  label: string;
}

const RatingProgress: React.FC<RatingProgressProps> = ({ value, label }) => {
  const percentage = (value / 5) * 100;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          width: '100%',
          height: 4,
          borderRadius: 100,
          ml: 1,
          '.MuiLinearProgress-bar': {
            borderRadius: 100,
            backgroundColor: 'black.500',
          },
          backgroundColor: 'black.100',
        }}
      />
    </Box>
  );
};

export default RatingProgress;

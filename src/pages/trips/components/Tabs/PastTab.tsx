import { Box, Paper, Typography } from '@mui/material';
import { NO_BOOKING_URL } from '../../constant';
import { useState } from 'react';

const PastTab = () => {
  const [trips, setTrips] = useState<[]>([]);
  return (
    <Box sx={{ p: 3 }}>
      {trips.length === 0 ? (
        <Paper sx={{ display: 'flex' }} elevation={0}>
          <img src={NO_BOOKING_URL} />
        </Paper>
      ) : (
        <Typography>Past Trips</Typography>
      )}
    </Box>
  );
};

export default PastTab;

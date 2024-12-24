import { Box, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { NO_BOOKING_URL } from '../../constant';

const CancelTab = () => {
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

export default CancelTab;

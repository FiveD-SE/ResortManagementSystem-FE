import { Box, Typography } from '@mui/material';
import Header from './components/Header';
import TripTabs from './components/TripTabs';

const Trips = () => {
  return (
    <Box sx={{ display: 'flex', paddingX: 8, flexDirection: 'column' }}>
      <Header />
      <TripTabs />
    </Box>
  );
};

export default Trips;

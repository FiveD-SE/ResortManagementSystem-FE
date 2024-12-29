import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TotalCard from './components/TotalCard';
import BookingTab from './components/BookingTab';
import * as React from 'react';
import { useGetBookingsStatusCountQuery } from '../../../../apis/bookingApi';

const Dashboard = () => {
  const [totalCheckIn, setTotalCheckIn] = React.useState(0);
  const [totalPending, setTotalPending] = React.useState(0);
  const [totalCheckOut, setTotalCheckOut] = React.useState(0);
  const { data, isLoading } = useGetBookingsStatusCountQuery();

  React.useEffect(() => {
    setTotalCheckIn(data?.checkedIn || 0);
    setTotalPending(data?.pending || 0);
    setTotalCheckOut(data?.checkedOut || 0);
  }, [data]);
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        <Grid size={4}>
          <TotalCard amount={totalCheckIn} type="Check-in" isLoading={isLoading} />
        </Grid>
        <Grid size={4}>
          <TotalCard amount={totalPending} type="Pending" isLoading={isLoading} />
        </Grid>
        <Grid size={4}>
          <TotalCard amount={totalCheckOut} type="Check-out" isLoading={isLoading} />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <BookingTab />
      </Box>
    </Box>
  );
};

export default Dashboard;

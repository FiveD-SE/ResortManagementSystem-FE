import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TotalCard from './components/TotalCard';
import ServiceTab from './components/ServiceTab';
import { useGetBookingServicesCountQuery } from '../../../../apis/bookingApi';
import * as React from 'react';

const Dashboard = () => {
  const [totalServed, setTotalServed] = React.useState(0);
  const [totalPending, setTotalPending] = React.useState(0);
  const { data, isLoading } = useGetBookingServicesCountQuery();
  React.useEffect(() => {
    setTotalPending(data?.pending || 0);
    setTotalServed(data?.served || 0);
  }, [data]);
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        <Grid size={6}>
          <TotalCard amount={totalPending} type="Pending" isLoading={isLoading} />
        </Grid>
        <Grid size={6}>
          <TotalCard amount={totalServed} type="Served" isLoading={isLoading} />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <ServiceTab />
      </Box>
    </Box>
  );
};

export default Dashboard;

import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TotalCard from './components/TotalCard';
import ServiceTab from './components/ServiceTab';
const Dashboard = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        <Grid size={6}>
          <TotalCard amount={5} type="Pending" />
        </Grid>
        <Grid size={6}>
          <TotalCard amount={10} type="Served" />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <ServiceTab />
      </Box>
    </Box>
  );
};

export default Dashboard;

import { Box, Typography } from '@mui/material';
import Header from './Header';
import Grid from '@mui/material/Grid2';
import TripForm from './Detail/TripForm';
const TripDetail = () => {
  return (
    <Box sx={{ paddingX: 8, width: '100%' }}>
      <Header haveBackNav={true} />
      <Box sx={{ flexGrow: 1, paddingX: 4 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TripForm />
          </Grid>
          <Grid size={6}>
            <Typography>Item 2</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TripDetail;

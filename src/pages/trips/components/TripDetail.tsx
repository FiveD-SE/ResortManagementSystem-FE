import { Box } from '@mui/material';
import Header from './Header';
import Grid from '@mui/material/Grid2';
import TripForm from './Detail/TripForm';
import PricingCard from './Detail/PricingCard';
import { useParams } from 'react-router-dom';
import { useGetBookingByIdQuery } from '../../../apis/bookingApi';
const TripDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const { data, isFetching } = useGetBookingByIdQuery(id || '');
  console.log(data);
  return (
    <Box sx={{ paddingX: 8, width: '100%' }}>
      <Header haveBackNav={true} title="Booking" />
      <Box sx={{ flexGrow: 1, paddingX: 4 }}>
        <Grid container spacing={4}>
          <Grid size={6} sx={{ padding: 4 }}>
            <TripForm booking={data || null} />
          </Grid>
          <Grid size={6} sx={{ padding: 4 }}>
            <PricingCard data={data || null} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TripDetail;

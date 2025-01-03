import { Box, Container } from '@mui/material';
import Header from './Header';
import Grid from '@mui/material/Grid2';
import TripForm from './Detail/TripForm';
import PricingCard from './Detail/PricingCard';
import { useParams } from 'react-router-dom';
import { useGetBookingByIdQuery } from '../../../apis/bookingApi';
import { CardLoading, TextLoading } from './Skeleton';

const TripDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching, refetch: refetchBooking } = useGetBookingByIdQuery(id || '');
  return (
    <Container>
      <Header title="Booking" />
      <Box>
        <Grid
          container
          spacing={{
            xs: 2,
            sm: 6,
          }}
        >
          <Grid order={{ xs: 2, sm: 1 }} size={{ xs: 12, sm: 6 }}>
            {isFetching ? <TextLoading /> : <TripForm booking={data || null} refetchBooking={refetchBooking} />}
          </Grid>
          <Grid order={{ xs: 1, sm: 2 }} size={{ xs: 12, sm: 6 }}>
            {isFetching ? <CardLoading /> : <PricingCard data={data || null} />}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TripDetail;

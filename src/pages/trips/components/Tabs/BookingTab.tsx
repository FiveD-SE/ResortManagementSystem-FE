import { Box, Card, CardActionArea, CircularProgress, Paper, Skeleton, Typography } from '@mui/material';
import BookingList from './components/BookingList';
import { useGetBookingsByUserIdQuery } from '../../../../apis/bookingApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../stores/store';

interface IProps {
  type: 'upcoming' | 'past' | 'staying';
}

const BookingTab = (props: IProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { data, isFetching } = useGetBookingsByUserIdQuery({ userId: user?.id || '', filter: props.type });
  return (
    <Box sx={{ paddingX: 6, paddingY: 3 }}>
      {isFetching || data === undefined ? (
        Array.from({ length: 2 }).map((_, index) => (
          <Card key={index} variant="outlined" sx={{ marginY: 2, flex: 1 }}>
            <CardActionArea sx={{ display: 'flex', padding: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                <Skeleton variant="rectangular" width={100} height={100} />
                <Box
                  sx={{
                    paddingX: 2,
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <Skeleton variant="text" width="100%" height={40} />
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="text" width="60%" height={20} />
                </Box>
              </Box>
              <Skeleton variant="circular" width={20} height={20} />
            </CardActionArea>
          </Card>
        ))
      ) : data?.docs.length === 0 ? (
        <Paper
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}
          elevation={0}
        >
          <Typography variant="h6" gutterBottom>
            No bookings found.
          </Typography>
          <Typography variant="body1">You don't have any {props.type} bookings yet.</Typography>
        </Paper>
      ) : (
        <BookingList trips={data?.docs} />
      )}
    </Box>
  );
};

export default BookingTab;

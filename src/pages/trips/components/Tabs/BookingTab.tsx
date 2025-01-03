import { Box, CircularProgress, Paper } from '@mui/material';
import BookingList from './components/BookingList';
import { NO_BOOKING_URL } from '../../constant';
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
        <Paper sx={{ display: 'flex' }} elevation={0}>
          <CircularProgress />
        </Paper>
      ) : data?.docs.length === 0 ? (
        <Paper sx={{ display: 'flex' }} elevation={0}>
          <img src={NO_BOOKING_URL} />
        </Paper>
      ) : (
        <BookingList trips={data?.docs} />
      )}
    </Box>
  );
};

export default BookingTab;

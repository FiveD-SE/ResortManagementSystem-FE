import { Box, Paper } from '@mui/material';
import BookingList from './components/BookingList';
import { NO_BOOKING_URL } from '../../constant';
import { ITrip } from '../../../../types';

const fakeData: ITrip[] = [
  {
    id: 1,
    name: 'Trip 1',
    startDate: 'Dec 1, 2021',
    endDate: 'Dec 5, 2021',
    status: 'Upcoming',
    amount: 2,
  },
  {
    id: 2,
    name: 'Trip 2',
    startDate: 'Nov 1, 2021',
    endDate: 'Nov 5, 2021',
    status: 'Upcoming',
    amount: 3,
  },
  {
    id: 3,
    name: 'Trip 3',
    startDate: 'July 22, 2021',
    endDate: 'July 26, 2021',
    status: 'Upcoming',
    amount: 4,
  },
  {
    id: 4,
    name: 'Trip 4',
    startDate: 'Janurary 1, 2021',
    endDate: 'Janurary 5, 2021',
    status: 'Upcoming',
    amount: 5,
  },
];

interface IProps {
  trips: ITrip[];
  type: string;
}

const BookingTab = (props: IProps) => {
  return (
    <Box sx={{ paddingX: 6, paddingY: 3 }}>
      {props.trips.length === 0 ? (
        <Paper sx={{ display: 'flex' }} elevation={0}>
          <img src={NO_BOOKING_URL} />
        </Paper>
      ) : (
        <BookingList trips={props.trips} />
      )}
    </Box>
  );
};

export default BookingTab;

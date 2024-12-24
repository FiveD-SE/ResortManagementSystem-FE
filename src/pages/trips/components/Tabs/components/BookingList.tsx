import { Box } from '@mui/material';
import { Trip } from '../../../types';
import BookingCard from '../../Cards/BookingCard';
import SearchButton from './SearchButton';

interface IProps {
  trips: Trip[];
}

const BookingList = (props: IProps) => {
  return (
    <Box>
      {props.trips.map((trip: Trip) => (
        <BookingCard trip={trip} />
      ))}
      <SearchButton />
    </Box>
  );
};

export default BookingList;

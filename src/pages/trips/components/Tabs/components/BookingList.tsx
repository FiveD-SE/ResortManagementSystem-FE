import { Box } from '@mui/material';
import BookingCard from './BookingCard';
import SearchButton from './SearchButton';
import { ITrip } from '../../../../../types';

interface IProps {
  trips: ITrip[];
}

const BookingList = (props: IProps) => {
  return (
    <Box>
      {props.trips.map((trip: ITrip) => (
        <BookingCard trip={trip} />
      ))}
      <SearchButton />
    </Box>
  );
};

export default BookingList;

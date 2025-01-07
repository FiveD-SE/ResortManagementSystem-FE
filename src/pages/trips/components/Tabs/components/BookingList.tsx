import { Grid } from '@mui/material';
import BookingCard from './BookingCard';
import { ITrip } from '../../../../../types';

interface IProps {
  trips: ITrip[];
}

const BookingList = (props: IProps) => {
  return (
    <Grid container spacing={2}>
      {props.trips.map((trip: ITrip) => (
        <Grid item xs={12} sm={12} md={4} key={trip.id}>
          <BookingCard trip={trip} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookingList;

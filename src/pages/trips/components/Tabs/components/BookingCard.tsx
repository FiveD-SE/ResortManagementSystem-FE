import { Box, Card, CardActionArea, Paper, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ITrip } from '../../../../../types';

const convertDateTime = (date: Date) => {
  return new Date(date).toLocaleDateString('en-GB');
};

const BookingCard = ({ trip }: { trip: ITrip }) => {
  return (
    <Card variant="outlined" sx={{ marginY: 2 }}>
      <CardActionArea
        sx={{ display: 'flex', padding: 2, flexDirection: 'row', justifyContent: 'space-between' }}
        onClick={() => (window.location.href = `/trips/detail/${trip.id}`)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Paper sx={{ display: 'flex' }}>
            <img src={trip.roomId.images[0]} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          </Paper>
          <Box sx={{ paddingX: 2, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">{trip.roomId.roomNumber}</Typography>
            <Typography variant="body1">
              {convertDateTime(trip.checkinDate)} - {convertDateTime(trip.checkoutDate)}
            </Typography>
            <Typography variant="body1">Status: {trip.status}</Typography>
          </Box>
        </Box>
        <ArrowForwardIosIcon />
      </CardActionArea>
    </Card>
  );
};

export default BookingCard;

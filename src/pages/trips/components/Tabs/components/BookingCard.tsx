import { Box, Card, CardActionArea, Paper, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Trip } from '../../../types';

const BookingCard = ({ trip }: { trip: Trip }) => {
  return (
    <Card variant="outlined" sx={{ marginY: 2 }}>
      <CardActionArea
        sx={{ display: 'flex', padding: 2, flexDirection: 'row', justifyContent: 'space-between' }}
        onClick={() => (window.location.href = `/trips/detail/${trip.id}`)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Paper sx={{ display: 'flex' }}>
            <img src="https://placehold.co/100/png" />
          </Paper>
          <Box sx={{ paddingX: 2, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">{trip.name}</Typography>
            <Typography variant="body1">
              {trip.startDate} - {trip.endDate}
            </Typography>
            <Typography variant="body1">Guest: {trip.amount}</Typography>
          </Box>
        </Box>
        <ArrowForwardIosIcon />
      </CardActionArea>
    </Card>
  );
};

export default BookingCard;

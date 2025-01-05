import { Avatar, Box, Card, CardActionArea, Typography } from '@mui/material';
import { ITrip } from '../../../../../types';
import { formatDate } from '../../../../../utils';
import { ChevronRightRounded } from '@mui/icons-material';

const BookingCard = ({ trip }: { trip: ITrip }) => {
  return (
    <Card variant="outlined" sx={{ marginY: 2, borderRadius: 4, boxShadow: 1 }}>
      <CardActionArea
        sx={{ display: 'flex', padding: 2, flexDirection: 'row', justifyContent: 'space-between' }}
        onClick={() => (window.location.href = `/trips/detail/${trip.id}`)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Avatar src={trip.roomId.images[0]} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 6 }} />
          <Box sx={{ paddingX: 2, justifyContent: 'space-between', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6">{trip.roomId.roomNumber}</Typography>
            <Typography variant="body2">
              From: {formatDate(trip.checkinDate)} to {formatDate(trip.checkoutDate)}
            </Typography>
            <Typography variant="body2">To {formatDate(trip.checkoutDate)}</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'gray.50',
                paddingY: 0.5,
                paddingX: 2,
                borderRadius: 4,
                width: 'fit-content',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {trip.status}
              </Typography>
            </Box>
          </Box>
        </Box>
        <ChevronRightRounded />
      </CardActionArea>
    </Card>
  );
};

export default BookingCard;

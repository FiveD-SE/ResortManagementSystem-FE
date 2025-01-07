import { Avatar, Box, Card, CardActionArea, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ITrip } from '../../../../../types';
import { formatDate } from '../../../../../utils';
import { ChevronRightRounded } from '@mui/icons-material';

const BookingCard = ({ trip }: { trip: ITrip }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card variant="outlined" sx={{ marginY: 2, borderRadius: 4, boxShadow: 1 }}>
      <CardActionArea
        sx={{
          display: 'flex',
          padding: 2,
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isSmallScreen ? 'center' : 'flex-start',
        }}
        onClick={() => (window.location.href = `/trips/detail/${trip.id}`)}
      >
        <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', gap: isSmallScreen ? 2 : 0 }}>
          <Avatar
            src={trip.roomId.images[0]}
            sx={{
              width: isSmallScreen ? '100%' : 120,
              height: isSmallScreen ? 'auto' : 120,
              objectFit: 'cover',
              borderRadius: isSmallScreen ? 4 : 6,
            }}
          />
          <Box
            sx={{
              paddingX: isSmallScreen ? 0 : 2,
              justifyContent: 'space-between',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
              {trip.roomId.roomNumber}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
              <Typography variant="body2">From:</Typography>
              <Typography variant="body2">{formatDate(trip.checkinDate)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between' }}>
              <Typography variant="body2">To:</Typography>
              <Typography variant="body2">{formatDate(trip.checkoutDate)}</Typography>
            </Box>
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
        <Box
          sx={{ display: 'flex', alignItems: 'center', width: isSmallScreen ? '100%' : 'auto', justifyContent: 'flex-end' }}
        >
          <ChevronRightRounded />
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default BookingCard;

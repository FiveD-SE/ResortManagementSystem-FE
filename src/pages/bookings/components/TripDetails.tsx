import { Box, Grid, Link, Typography } from '@mui/material';
import { useState } from 'react';
import DateChangeDialog from './DateChangeDialog';
import GuestChangeDialog from './GuestChangeDialog';
import { formatDateRange } from '../../../utils';
import { Dayjs } from 'dayjs';

interface TripDetailsProps {
  guests: {
    adults: number;
    children: number;
  };
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
  guestAmount: number;
}

const TripDetails = ({ guests, checkInDate, checkOutDate, guestAmount }: TripDetailsProps) => {
  const [openDateChangeDialog, setOpenDateChangeDialog] = useState(false);
  const [openGuestChangeDialog, setOpenGuestChangeDialog] = useState(false);

  const handleOpenDateChangeDialog = () => {
    setOpenDateChangeDialog(true);
  };

  const handleCloseDateChangeDialog = () => {
    setOpenDateChangeDialog(false);
  };

  const handleOpenGuestChangeDialog = () => {
    setOpenGuestChangeDialog(true);
  };

  const handleCloseGuestChangeDialog = () => {
    setOpenGuestChangeDialog(false);
  };

  const totalGuests = guests.adults + guests.children;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pb: 2 }}>
      <Box sx={{ width: '100%', mb: 3 }}>
        <Typography variant="h5" component="h1" sx={{ color: 'black.500' }}>
          Your trip
        </Typography>
      </Box>
      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Grid item>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="subtitle1" component="h2" sx={{ color: 'black.500' }}>
              Dates
            </Typography>
            <Typography variant="body2" component="p" sx={{ color: 'black.300' }}>
              {formatDateRange(
                checkInDate ? checkInDate.format('YYYY-MM-DD') : '',
                checkOutDate ? checkOutDate.format('YYYY-MM-DD') : '',
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Link
            underline="hover"
            sx={{ color: 'black.500', fontWeight: 500 }}
            component="button"
            onClick={handleOpenDateChangeDialog}
          >
            Edit
          </Link>
        </Grid>
        <DateChangeDialog
          open={openDateChangeDialog}
          onClose={handleCloseDateChangeDialog}
          selectedCheckInDate={checkInDate}
          selectedCheckOutDate={checkOutDate}
        />
      </Grid>
      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Grid item>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="subtitle1" component="h2" sx={{ color: 'black.500' }}>
              Guests
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.300' }}>
              {totalGuests} {totalGuests > 1 ? 'guests' : 'guest'} ({guests.adults} {guests.adults > 1 ? 'adults' : 'adult'},{' '}
              {guests.children} {guests.children > 1 ? 'children' : 'child'})
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Link
            underline="hover"
            sx={{ color: 'black.500', fontWeight: 500 }}
            component="button"
            onClick={handleOpenGuestChangeDialog}
          >
            Edit
          </Link>
        </Grid>
        <GuestChangeDialog
          open={openGuestChangeDialog}
          onClose={handleCloseGuestChangeDialog}
          guests={guests}
          guestAmount={guestAmount || 0}
        />
      </Grid>
    </Box>
  );
};

export default TripDetails;

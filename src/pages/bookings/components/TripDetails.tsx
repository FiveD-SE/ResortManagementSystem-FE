import { Box, Grid, Link, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import DateChangeDialog from './DateChangeDialog';
import GuestChangeDialog from './GuestChangeDialog';

interface TripDetailsProps {
  guests: { adults: number; children: number };
  handleGuestChange: (type: keyof { adults: number; children: number }, delta: number) => void;
  totalGuests: number;
  guestAmount: number;
}

const TripDetails = ({ guests, handleGuestChange, totalGuests, guestAmount }: TripDetailsProps) => {
  const [openDateChangeDialog, setOpenDateChangeDialog] = useState(false);
  const [openGuestChangeDialog, setOpenGuestChangeDialog] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(dayjs());
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(dayjs().add(5, 'day'));
  const handleCheckInChange = (date: Dayjs | null) => {
    setCheckInDate(date);
    if (checkOutDate && date && date.isAfter(checkOutDate.subtract(1, 'day'))) {
      setCheckOutDate(date.add(1, 'day'));
    }
  };

  const handleCheckOutChange = (date: Dayjs | null) => {
    setCheckOutDate(date);
    if (checkInDate && date && date.isBefore(checkInDate.add(1, 'day'))) {
      setCheckInDate(date.subtract(1, 'day'));
    }
  };

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
              Nov 16 - 20
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
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          handleCheckInChange={handleCheckInChange}
          handleCheckOutChange={handleCheckOutChange}
        />
      </Grid>
      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Grid item>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="subtitle1" component="h2" sx={{ color: 'black.500' }}>
              Guests
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.300' }}>
              2 guests
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
          handleGuestChange={handleGuestChange}
          totalGuests={totalGuests}
          guestAmount={guestAmount}
        />
      </Grid>
    </Box>
  );
};

export default TripDetails;

import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import GuestDropdownMenu from './GuestDropdownMenu';
import { IRoom, IRoomType } from '../../../types';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { formatPrice } from '../../../utils';

interface HandleClickEvent {
  currentTarget: EventTarget & HTMLDivElement;
}

interface ReservationCardProps {
  roomType: IRoomType;
  room?: IRoom;
  occupiedDates: { checkinDate: Dayjs; checkoutDate: Dayjs }[];
  nextAvailableWeek: {
    checkinDate: string;
    checkoutDate: string;
  };
}

const ReservationCard = ({ room, roomType, occupiedDates: roomOccupiedDate, nextAvailableWeek }: ReservationCardProps) => {
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [selectedGuests, setSelectedGuests] = useState<{ adults: number; children: number }>({
    adults: 1,
    children: 0,
  });

  const occupiedDates: Dayjs[] =
    roomOccupiedDate && roomOccupiedDate.length > 0
      ? roomOccupiedDate
          .map((dateRange) =>
            Array.from({ length: dayjs(dateRange.checkoutDate).diff(dayjs(dateRange.checkinDate), 'day') + 1 }).map(
              (_, index) => dayjs(dateRange.checkinDate).add(index, 'day'),
            ),
          )
          .flat()
      : [];

  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(
    nextAvailableWeek ? dayjs(nextAvailableWeek.checkinDate) : null,
  );
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(
    nextAvailableWeek ? dayjs(nextAvailableWeek.checkoutDate) : null,
  );

  const shouldDisableDate = (date: Dayjs) => {
    return occupiedDates.some((occupiedDate) => occupiedDate.isSame(date, 'day'));
  };

  const handleGuestSelectionChange = (newGuests: { adults: number; children: number }) => {
    setSelectedGuests(newGuests);
  };

  const handleClick = (event: HandleClickEvent) => {
    setIsGuestMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsGuestMenuOpen(false);
    setAnchorEl(null);
  };

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

  const numGuests = selectedGuests.adults + selectedGuests.children;

  const numNights = checkInDate && checkOutDate ? checkOutDate.diff(checkInDate, 'day') : 0;

  const totalPrice = numNights > 0 && room?.pricePerNight ? room.pricePerNight * numNights : 0;

  const formattedCheckInDate = checkInDate ? checkInDate.format('YYYY-MM-DD') : '';
  const formattedCheckOutDate = checkOutDate ? checkOutDate.format('YYYY-MM-DD') : '';

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 2.5,
        position: 'sticky',
        top: '16px',
        backgroundColor: 'white.50',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 424.5,
          gap: 2,
          px: 2.5,
          py: 3,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" sx={{ color: 'gray.500', textDecoration: 'line-through' }}>
              {room && roomType.basePrice > room.pricePerNight ? formatPrice(roomType.basePrice) : ''}
            </Typography>
            <Typography variant="h4" sx={{ color: 'black.500' }}>
              {room ? formatPrice(room.pricePerNight) : ''}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black.500' }}>
              night
            </Typography>
          </Box>
        </Box>
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              px: 2,
              py: 1,
              border: 1,
              borderColor: 'black.100',
              borderRadius: '16px 0 0 0',
            }}
          >
            <Typography variant="caption" sx={{ color: 'black.500', fontSize: 10, fontWeight: 600 }}>
              CHECK-IN
            </Typography>
            <DatePicker
              label="Check-in"
              value={checkInDate}
              onChange={handleCheckInChange}
              shouldDisableDate={shouldDisableDate}
              minDate={dayjs(checkInDate || undefined)}
              format="DD/MM/YYYY"
              slotProps={{
                field: {
                  clearable: true,
                  readOnly: true,
                },
                textField: {
                  size: 'small',
                  variant: 'standard',
                  InputProps: {
                    disableUnderline: true,
                    sx: {
                      fontSize: '14px',
                      fontWeight: '500',
                    },
                  },
                  label: null,
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              px: 2,
              py: 1,
              border: 1,
              borderColor: 'black.100',
              borderRadius: '0 16px 0 0',
              borderLeft: 0,
            }}
          >
            <Typography variant="caption" sx={{ color: 'black.500', fontSize: 10, fontWeight: 600 }}>
              CHECKOUT
            </Typography>
            <DatePicker
              label="Checkout"
              value={checkOutDate}
              onChange={handleCheckOutChange}
              shouldDisableDate={shouldDisableDate}
              minDate={dayjs(checkOutDate)}
              format="DD/MM/YYYY"
              slotProps={{
                field: {
                  clearable: true,
                  readOnly: true,
                },
                textField: {
                  size: 'small',
                  variant: 'standard',
                  InputProps: {
                    disableUnderline: true,
                    sx: {
                      fontSize: '14px',
                      fontWeight: '500',
                    },
                  },
                  label: null,
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              border: 1,
              borderColor: 'black.100',
              borderRadius: '0 0 16px 16px',
              borderTop: 0,
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            <Box>
              <Typography variant="caption" sx={{ color: 'black.500', fontSize: 10, fontWeight: 600 }}>
                GUESTS
              </Typography>
              <Typography variant="body2" sx={{ color: 'black.500' }}>
                {numGuests} {numGuests === 1 ? 'guest' : 'guests'}
              </Typography>
            </Box>
            <IconButton>
              <ExpandMoreRounded
                sx={{
                  transition: 'transform 0.3s',
                  transform: isGuestMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </IconButton>
          </Grid>
          <GuestDropdownMenu
            anchorEl={anchorEl}
            open={isGuestMenuOpen}
            onClose={handleClose}
            guestAmount={roomType.guestAmount}
            onGuestChange={handleGuestSelectionChange}
          />
        </Grid>
        <Link
          to={
            room
              ? `${ROUTES.BOOKINGS.replace(':roomId', room.id)}?checkin=${formattedCheckInDate}&checkout=${formattedCheckOutDate}&adults=${selectedGuests.adults}&children=${selectedGuests.children}`
              : '#'
          }
          style={{ textDecoration: 'none' }}
        >
          <Button
            variant="contained"
            sx={{
              width: '100%',
              py: 2,
              backgroundColor: 'primary.500',
              borderRadius: 3,
            }}
          >
            <Typography sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }}>Reserve</Typography>
          </Button>
        </Link>
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'black.400' }}>
          You won't be charged yet
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {room && (
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              {formatPrice(room.pricePerNight)} x {numNights} {numNights > 1 ? 'nights' : 'night'}
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            {room ? formatPrice(room.pricePerNight * numNights) : ''}
          </Typography>
        </Box>

        <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontSize: 16, color: 'black.500', fontWeight: 700 }}>
            Total
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 16, color: 'black.500', fontWeight: 700 }}>
            {formatPrice(totalPrice)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReservationCard;

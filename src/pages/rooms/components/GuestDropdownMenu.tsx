import { Box, Menu, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import GuestControl from './GuestControl';

import { MenuProps } from '@mui/material';

interface GuestDropdownMenuProps {
  anchorEl: MenuProps['anchorEl'];
  open: boolean;
  guestAmount: number;
  onClose: () => void;
  onGuestChange: (guests: Guests) => void;
}

interface Guests {
  adults: number;
  children: number;
}

const GuestDropdownMenu = ({ anchorEl, open, onClose, guestAmount, onGuestChange }: GuestDropdownMenuProps) => {
  const [guests, setGuests] = useState<Guests>({ adults: 1, children: 0 });

  useEffect(() => {
    onGuestChange(guests);
  }, [guests, onGuestChange]);

  const handleGuestChange = (type: keyof Guests, delta: number) => {
    setGuests((prevGuests) => {
      const newGuests = { ...prevGuests };
      if (type === 'adults') {
        newGuests.adults = Math.max(1, newGuests.adults + delta);
      } else if (type === 'children') {
        newGuests.children = Math.max(0, newGuests.children + delta);
      }

      const totalGuests = newGuests.adults + newGuests.children;

      if (totalGuests > guestAmount) {
        const excess = totalGuests - guestAmount;
        if (type === 'adults') {
          newGuests.children = Math.max(0, newGuests.children - excess);
        } else if (type === 'children') {
          newGuests.adults = Math.max(1, newGuests.adults - excess);
        }
      }

      while (newGuests.adults + newGuests.children > guestAmount) {
        if (newGuests.children > 0) {
          newGuests.children--;
        } else if (newGuests.adults > 1) {
          newGuests.adults--;
        } else {
          break;
        }
      }

      return newGuests;
    });
  };

  const totalGuests = guests.adults + guests.children;

  const handleClose = () => {
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{ sx: { width: '23%', borderRadius: '0.75rem' } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 3 }}>
        <GuestControl
          label="Adults"
          description="Ages 13 or above"
          value={guests.adults}
          onIncrement={() => handleGuestChange('adults', 1)}
          onDecrement={() => handleGuestChange('adults', -1)}
          disabledIncrement={totalGuests >= guestAmount}
        />
        <Divider orientation="horizontal" flexItem />
        <GuestControl
          label="Children"
          description="Ages 2-12"
          value={guests.children}
          onIncrement={() => handleGuestChange('children', 1)}
          onDecrement={() => handleGuestChange('children', -1)}
          disabledIncrement={totalGuests >= guestAmount}
        />

        {totalGuests > guestAmount && (
          <Typography variant="body2" color="error">
            The total number of guests cannot exceed {guestAmount}.
          </Typography>
        )}
      </Box>
    </Menu>
  );
};

export default GuestDropdownMenu;

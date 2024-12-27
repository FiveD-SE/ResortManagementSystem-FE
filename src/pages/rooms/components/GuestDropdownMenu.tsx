import { Box, Menu, Divider } from '@mui/material';
import { useState } from 'react';
import GuestControl from './GuestControl';

import { MenuProps } from '@mui/material';

interface GuestDropdownMenuProps {
  anchorEl: MenuProps['anchorEl'];
  open: boolean;
  onClose: () => void;
}

interface Guests {
  adults: number;
  children: number;
  infants: number;
}

const GuestDropdownMenu = ({ anchorEl, open, onClose }: GuestDropdownMenuProps) => {
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });

  const handleGuestChange = (type: keyof Guests, delta: number) => {
    setGuests((prevGuests: Guests) => ({
      ...prevGuests,
      [type]: Math.max(type === 'adults' ? 1 : 0, prevGuests[type] + delta),
    }));
  };

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
        />
        <Divider orientation="horizontal" flexItem />
        <GuestControl
          label="Children"
          description="Ages 2-12"
          value={guests.children}
          onIncrement={() => handleGuestChange('children', 1)}
          onDecrement={() => handleGuestChange('children', -1)}
        />
        <Divider orientation="horizontal" flexItem />
        <GuestControl
          label="Infants"
          description="Under 2"
          value={guests.infants}
          onIncrement={() => handleGuestChange('infants', 1)}
          onDecrement={() => handleGuestChange('infants', -1)}
        />
      </Box>
    </Menu>
  );
};

export default GuestDropdownMenu;

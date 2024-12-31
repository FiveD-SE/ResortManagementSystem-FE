import CustomDialog from '../../../components/CustomDialog';
import { Box, Button, Divider, Typography } from '@mui/material';
import GuestControl from '../../rooms/components/GuestControl';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface GuestChangeDialogProps {
  open: boolean;
  onClose: () => void;
  guests: Guests;
  guestAmount: number;
}
interface Guests {
  adults: number;
  children: number;
}

const GuestChangeDialog = ({ open, onClose, guests: selectedGuests, guestAmount }: GuestChangeDialogProps) => {
  const [currentGuests, setCurrentGuests] = useState<Guests>(selectedGuests);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleGuestChange = (type: keyof Guests, delta: number) => {
    setCurrentGuests((prevGuests) => {
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

  const handleSaveGuestChange = () => {
    if (currentGuests) {
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set('adults', currentGuests.adults.toString());
      currentParams.set('children', currentGuests.children.toString());
      setSearchParams(currentParams, { replace: true });
    }

    onClose();
  };

  const totalGuests = currentGuests.adults + currentGuests.children;

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      actions={
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ borderRadius: 2 }}>
            <Typography sx={{ fontSize: 16, textTransform: 'none', fontWeight: 600 }}>Cancel</Typography>
          </Button>
          <Button variant="contained" onClick={handleSaveGuestChange} sx={{ borderRadius: 2 }}>
            <Typography sx={{ fontSize: 16, textTransform: 'none', fontWeight: 600 }}>Save</Typography>
          </Button>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <GuestControl
          label="Adults"
          description="Ages 13 or above"
          value={currentGuests.adults}
          onIncrement={() => handleGuestChange('adults', 1)}
          onDecrement={() => handleGuestChange('adults', -1)}
          disabledIncrement={totalGuests >= guestAmount}
        />
        <Divider orientation="horizontal" flexItem />
        <GuestControl
          label="Children"
          description="Ages 2-12"
          value={currentGuests.children}
          onIncrement={() => handleGuestChange('children', 1)}
          onDecrement={() => handleGuestChange('children', -1)}
          disabledIncrement={totalGuests >= guestAmount}
        />
      </Box>
    </CustomDialog>
  );
};

export default GuestChangeDialog;

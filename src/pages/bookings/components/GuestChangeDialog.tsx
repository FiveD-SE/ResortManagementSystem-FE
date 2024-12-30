import CustomDialog from '../../../components/CustomDialog';
import { Box, Divider, Typography } from '@mui/material';
import GuestControl from '../../rooms/components/GuestControl';

interface GuestChangeDialogProps {
  open: boolean;
  onClose: () => void;
  guests: { adults: number; children: number };
  handleGuestChange: (type: keyof { adults: number; children: number }, delta: number) => void;
  totalGuests: number;
  guestAmount: number;
}

const GuestChangeDialog = ({
  open,
  onClose,
  guests,
  handleGuestChange,
  totalGuests,
  guestAmount,
}: GuestChangeDialogProps) => {
  return (
    <CustomDialog open={open} onClose={onClose}>
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
    </CustomDialog>
  );
};

export default GuestChangeDialog;

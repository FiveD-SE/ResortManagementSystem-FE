import { Box, Button, Grid, Typography } from '@mui/material';
import CustomDialog from '../../../components/CustomDialog';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface DateChangeDialogProps {
  open: boolean;
  onClose: () => void;
  selectedCheckInDate: dayjs.Dayjs | null;
  selectedCheckOutDate: dayjs.Dayjs | null;
  shouldDisableDate: (date: dayjs.Dayjs) => boolean;
}

const DateChangeDialog = ({
  open,
  onClose,
  selectedCheckInDate,
  selectedCheckOutDate,
  shouldDisableDate,
}: DateChangeDialogProps) => {
  const [currentCheckInDate, setCurrentCheckInDate] = useState<dayjs.Dayjs | null>(selectedCheckInDate);
  const [currentCheckOutDate, setCurrentCheckOutDate] = useState<dayjs.Dayjs | null>(selectedCheckOutDate);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckInChange = (date: Dayjs | null) => {
    setCurrentCheckInDate(date);
    if (currentCheckOutDate && date && date.isAfter(currentCheckOutDate.subtract(1, 'day'))) {
      setCurrentCheckOutDate(date.add(1, 'day'));
    }
  };

  const handleCheckOutChange = (date: dayjs.Dayjs | null) => {
    setCurrentCheckOutDate(date);
  };

  const handleDeleteDate = () => {
    setCurrentCheckInDate(null);
    setCurrentCheckOutDate(null);
  };

  const handleSaveDateChange = () => {
    if (currentCheckInDate && currentCheckOutDate) {
      const formattedCheckIn = currentCheckInDate.format('YYYY-MM-DD');
      const formattedCheckOut = currentCheckOutDate.format('YYYY-MM-DD');

      const currentParams = new URLSearchParams(searchParams);
      currentParams.set('checkin', formattedCheckIn);
      currentParams.set('checkout', formattedCheckOut);
      setSearchParams(currentParams, { replace: true });
    }

    onClose();
  };

  const nights =
    currentCheckInDate && currentCheckOutDate ? dayjs(currentCheckOutDate).diff(dayjs(currentCheckInDate), 'day') : 0;

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      actions={
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={handleDeleteDate} sx={{ borderRadius: 2 }}>
            <Typography sx={{ fontSize: 16, textTransform: 'none', fontWeight: 600 }}>Delete date</Typography>
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveDateChange}
            sx={{ borderRadius: 2 }}
            disabled={!currentCheckInDate || !currentCheckOutDate}
          >
            <Typography sx={{ fontSize: 16, textTransform: 'none', fontWeight: 600 }}>Save</Typography>
          </Button>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
          <Typography variant="h4" component="h2" sx={{ color: 'black.500' }}>
            {nights} {nights > 1 ? 'nights' : 'night'}
          </Typography>
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
              borderRadius: '16px 0 0 16px',
            }}
          >
            <Typography variant="caption" sx={{ color: 'black.500', fontSize: 12, fontWeight: 600 }}>
              CHECK-IN
            </Typography>
            <DatePicker
              label="Check-in"
              value={currentCheckInDate}
              onChange={handleCheckInChange}
              shouldDisableDate={shouldDisableDate}
              minDate={dayjs(currentCheckInDate || undefined)}
              format="MM-DD-YYYY"
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
              borderRadius: '0 16px 16px 0',
              borderLeft: 0,
            }}
          >
            <Typography variant="caption" sx={{ color: 'black.500', fontSize: 12, fontWeight: 600 }}>
              CHECKOUT
            </Typography>
            <DatePicker
              label="Checkout"
              value={currentCheckOutDate}
              onChange={handleCheckOutChange}
              shouldDisableDate={shouldDisableDate}
              minDate={currentCheckInDate ? currentCheckInDate.add(1, 'day') : dayjs().add(1, 'day')}
              format="MM-DD-YYYY"
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
        </Grid>
      </Box>
    </CustomDialog>
  );
};

export default DateChangeDialog;

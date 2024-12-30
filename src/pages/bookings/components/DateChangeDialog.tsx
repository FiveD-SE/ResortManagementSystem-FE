import { Box, Grid, Typography } from '@mui/material';
import CustomDialog from '../../../components/CustomDialog';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface DateChangeDialogProps {
  open: boolean;
  onClose: () => void;
  checkInDate: dayjs.Dayjs | null;
  handleCheckInChange: (date: dayjs.Dayjs | null) => void;
  checkOutDate: dayjs.Dayjs | null;
  handleCheckOutChange: (date: dayjs.Dayjs | null) => void;
}

const DateChangeDialog = ({
  open,
  onClose,
  checkInDate,
  handleCheckInChange,
  checkOutDate,
  handleCheckOutChange,
}: DateChangeDialogProps) => {
  return (
    <CustomDialog open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
          <Typography variant="h4" component="h2" sx={{ color: 'black.500' }}>
            5 nights
          </Typography>
          <Typography variant="body1" component="h2" sx={{ color: 'black.300' }}>
            3 beds - 2 bathrooms
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
              value={checkInDate}
              onChange={handleCheckInChange}
              minDate={dayjs()}
              format="DD/MM/YYYY"
              slotProps={{
                field: {
                  clearable: true,
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
              value={checkOutDate}
              onChange={handleCheckOutChange}
              minDate={checkInDate ? checkInDate.add(1, 'day') : dayjs().add(1, 'day')}
              format="DD/MM/YYYY"
              slotProps={{
                field: {
                  clearable: true,
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

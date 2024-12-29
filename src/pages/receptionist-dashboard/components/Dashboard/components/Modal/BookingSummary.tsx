import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { IBooking } from '../../../../../../types';

interface IProps {
  onClose: () => void;
  data: IBooking | null;
}

function calculateDaysBetween(date1: Date, date2: Date) {
  // Convert both dates to milliseconds
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // Calculate the difference in milliseconds
  const diffInMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  return Math.round(diffInMs / (1000 * 60 * 60 * 24));
}

function calculateTotalAmount(pricePerNight: number, days: number) {
  return pricePerNight * days;
}

const BookingSummary = (props: IProps) => {
  const { data } = props;
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        justifyContent: 'space-between',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro' }}>
          Room Summary
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', color: '#5C5C5C' }}>
            Room Total (
            {data?.checkinDate && data?.checkoutDate ? calculateDaysBetween(data.checkinDate, data.checkoutDate) : 'N/A'}{' '}
            days)
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            {data?.roomId.pricePerNight !== undefined && data?.checkinDate && data?.checkoutDate
              ? calculateTotalAmount(
                  data.roomId.pricePerNight,
                  calculateDaysBetween(data.checkinDate, data.checkoutDate),
                ).toString()
              : 'N/A'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', color: '#5C5C5C' }}>
            Extra Person
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            0.0
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', color: '#5C5C5C' }}>
            Extras
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            30.00
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', color: '#5C5C5C' }}>
            Subtotal
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            330.00
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', color: '#5C5C5C' }}>
            Discount
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            -33.00 (10%)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro' }} color="primary">
            Total
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }} color="primary">
            320.00
          </Typography>
        </Box>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }} gap={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#fff', boxShadow: 4, borderRadius: 2, width: 100 }}
          onClick={props.onClose}
        >
          <Typography variant="body1" sx={{ color: '#000', fontFamily: 'Be Vietnam Pro', textShadow: 'unset' }}>
            Close
          </Typography>
        </Button>
        <Button variant="contained" sx={{ borderRadius: 2, width: 100 }} color="primary">
          Foward
        </Button>
      </Box>
    </Box>
  );
};

export default BookingSummary;

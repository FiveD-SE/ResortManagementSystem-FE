import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { TRIPS_FORM } from '../../constant';
import { IBooking } from '../../../../types/booking';
import PaidIcon from '@mui/icons-material/Paid';

interface IProps {
  booking: IBooking | null;
}

const convertDateTime = (date: Date) => {
  return new Date(date).toLocaleDateString('en-GB');
};

const TripForm = (props: IProps) => {
  const { booking } = props;
  return (
    <Stack gap={4}>
      <Typography sx={{ fontFamily: 'Be Vietnam Pro', mb: 2, fontSize: 40, fontWeight: 'bold' }}>Your booking</Typography>
      <Box>
        <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
          Booking Date
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro' }}>
          {convertDateTime(booking?.createdAt || new Date())}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
          Guest
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro' }}>
          {(booking?.guest?.adults || 0) + (booking?.guest?.children || 0)} guests
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
          Payment
        </Typography>
        <Box
          sx={{
            border: '1px solid #E0E0E0',
            borderRadius: 3,
            padding: 2,
            flexDirection: 'row',
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <PaidIcon sx={{ width: 40, height: 40 }} />
          <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 24, fontWeight: 'bold', ml: 2 }}>
            {booking?.paymentMethod}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 3, padding: 2, backgroundColor: '#FF7A92' }}>
          <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro', color: '#fff', fontWeight: 'bold', fontSize: 24 }}>
            Voucher: {booking?.promotionId.promotionName}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro', color: '#fff', fontWeight: 'bold', fontSize: 24 }}>
            Due date: {convertDateTime(booking?.promotionId.endDate || new Date())}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro', color: '#fff', fontWeight: 'bold', fontSize: 24 }}>
            Discount: {booking?.promotionId.discount}%
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Stack spacing={2} gap={2}>
        <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
          {TRIPS_FORM.POLICY_TITLE}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro' }}>
          {TRIPS_FORM.POLICY_CONTENT}
        </Typography>
      </Stack>
      <Divider />
      <Stack gap={2}>
        <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
          {TRIPS_FORM.RULE_TITLE}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro' }}>
          {TRIPS_FORM.RULE_CONTENT.CONTENT}
        </Typography>
        <Box sx={{ marginLeft: 3 }}>
          <Typography variant="body2" sx={{ fontFamily: 'Be Vietnam Pro' }}>
            • {TRIPS_FORM.RULE_CONTENT.SUBCONTENT_1}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Be Vietnam Pro' }}>
            • {TRIPS_FORM.RULE_CONTENT.SUBCONTENT_2}
          </Typography>
        </Box>
      </Stack>
      <Button
        variant="contained"
        sx={{ p: 2, textTransform: 'none', width: '40%', borderRadius: 3, backgroundColor: '#C72D65' }}
      >
        <Typography
          variant="h3"
          sx={{ fontFamily: 'Be Vietnam Pro' }}
          onClick={() => (window.location.href = `/trips/review/${booking?.id}`)}
        >
          {TRIPS_FORM.START_TO_REVIEW}
        </Typography>
      </Button>
    </Stack>
  );
};

export default TripForm;

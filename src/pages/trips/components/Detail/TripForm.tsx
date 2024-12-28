import { Box, Button, Divider, Input, Stack, TextField, Typography } from '@mui/material';

import PaymentIcon from '@mui/icons-material/Payment';
import { TRIPS_FORM } from '../../constant';

import { useParams } from 'react-router-dom';

const TripForm = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <Stack gap={4}>
      <Typography variant="h1" sx={{ fontFamily: 'Be Vietnam Pro', mb: 2 }}>
        Your booking
      </Typography>
      <Box>
        <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
          Booking Date
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro' }}>
          2022-01-01
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
          Guest
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro' }}>
          2 guest
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
          Payment
        </Typography>
        <Button
          startIcon={<PaymentIcon />}
          variant="outlined"
          sx={{ fontFamily: 'Be Vietnam Pro', width: '100%', p: 2, justifyContent: 'flex-start' }}
        >
          Momo
        </Button>
      </Box>
      <Box>
        <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
          Voucher
        </Typography>
        <Button
          startIcon={<PaymentIcon />}
          variant="outlined"
          sx={{ fontFamily: 'Be Vietnam Pro', width: '100%', p: 2, justifyContent: 'flex-start' }}
        >
          Voucher
        </Button>
      </Box>
      <Divider />
      <Stack spacing={2} gap={2}>
        <Box>
          <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
            {TRIPS_FORM.MESSAGE_TITLE}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro' }}>
            {TRIPS_FORM.MESSAGE_CONTENT}
          </Typography>
        </Box>
        <TextField variant="outlined" multiline minRows={3} color="info" />
      </Stack>
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
          onClick={() => (window.location.href = `/trips/review/${id}`)}
        >
          {TRIPS_FORM.START_TO_REVIEW}
        </Typography>
      </Button>
    </Stack>
  );
};

export default TripForm;

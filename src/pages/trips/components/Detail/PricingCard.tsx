import { Box, Divider, Stack, Typography } from '@mui/material';

const PricingCard = () => {
  return (
    <Stack spacing={3} sx={{ padding: 4, border: '1px solid #E0E0E0', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }} gap={2}>
        <img src="https://placehold.co/150x100/png" style={{ borderRadius: 6 }} />
        <Box gap={2}>
          <Typography variant="h5" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            Entire Cabin
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Be Vietnam Pro' }}>
            Glacier Pines Cabin (New Hot Tub Installed!)
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
          Price Details
        </Typography>
        <Stack gap={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">500 x 5 nights</Typography>
            <Typography variant="body1">$2,500</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Long stay discount</Typography>
            <Typography variant="body1">$2,500</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Cleaning fee</Typography>
            <Typography variant="body1">$200</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Service fee</Typography>
            <Typography variant="body1">$0</Typography>
          </Box>
        </Stack>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            Total (VND)
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            đ2,567,648
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PricingCard;

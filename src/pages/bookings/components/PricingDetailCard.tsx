import { StarRounded } from '@mui/icons-material';
import { Avatar, Box, Divider, Typography } from '@mui/material';

const PricingDetailCard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar variant="rounded" sx={{ width: 128, height: 128, backgroundColor: 'gray.300' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'black.300' }}>
              Entire cabin
            </Typography>
            <Typography variant="body1" sx={{ color: 'black.500' }}>
              Glacier Pines Cabin (New Hot Tub Installed!)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarRounded sx={{ fontSize: 14 }} />
              <Typography variant="body1" sx={{ color: 'black.500' }}>
                4.98
              </Typography>
              <Typography variant="body1" sx={{ color: 'black.300' }}>
                (56 reviews)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'black.500' }}>
          Price details
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            500 x 5 nights
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            $2,500
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            Discount
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            -$300
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            Service fee
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            $0
          </Typography>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontSize: 16, color: 'black.500', fontWeight: 700 }}>
            Total
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 16, color: 'black.500', fontWeight: 700 }}>
            $0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PricingDetailCard;

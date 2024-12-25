import {
  ChatBubbleOutlineRounded,
  CheckCircleOutline,
  CleaningServicesOutlined,
  LocalOfferOutlined,
  MapOutlined,
  StarRounded,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';

const Ratings = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 4,
        px: 0,
        py: 4,
        borderTop: 1,
        borderColor: 'black.100',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <StarRounded sx={{ mr: 1 }} />
          4.91 (328 reviews)
        </Typography>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h6">Overall rating</Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h6">Cleanliness</Typography>
          <Typography variant="h5">4.8</Typography>
          <CleaningServicesOutlined />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h6">Accuracy</Typography>
          <Typography variant="h5">4.8</Typography>
          <CheckCircleOutline />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h6">Check-in</Typography>
          <Typography variant="h5">4.9</Typography>
          <VpnKeyOutlined />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h6">Communication</Typography>
          <Typography variant="h5">5</Typography>
          <ChatBubbleOutlineRounded />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h6">Location</Typography>
          <Typography variant="h5">4.8</Typography>
          <MapOutlined />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h6">Value</Typography>
          <Typography variant="h5">4.9</Typography>
          <LocalOfferOutlined />
        </Box>
      </Box>
    </Box>
  );
};

export default Ratings;

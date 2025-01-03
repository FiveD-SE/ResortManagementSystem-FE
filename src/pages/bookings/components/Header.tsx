import { ChevronLeftRounded } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', pt: 6, pb: 6, width: '100%', alignItems: 'center', position: 'relative', gap: 2 }}>
        <IconButton sx={{ p: 1 }} onClick={() => window.history.back()}>
          <ChevronLeftRounded fontSize="large" />
        </IconButton>
        <Typography variant="h2" component="div" sx={{ fontWeight: 600, color: 'black.500' }}>
          Request to book
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;

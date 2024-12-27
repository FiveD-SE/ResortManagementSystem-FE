import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: 6,
          pb: 6,
          width: '100%',
          alignItems: 'center',
          position: 'relative',
          gap: 2,
        }}
      >
        <Typography variant="h2" component="div" sx={{ fontWeight: 600, color: 'black.500' }}>
          My Profile
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontWeight: 500, color: 'black.300' }}>
          Manage your profile, privacy, and security
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;

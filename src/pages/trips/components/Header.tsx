import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', paddingY: 8 }}>
      <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 48, fontWeight: 600 }}>Booking</Typography>
    </Box>
  );
};

export default Header;

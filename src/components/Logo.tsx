import { Box } from '@mui/material';

const Logo = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/assets/images/' : 'src/assets/images/';
  return (
    <Box
      onClick={() => window.location.replace('/')}
      sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' }, position: 'absolute' }}
    >
      <img src={`${basePath}logo.png`} alt="brandname" style={{ height: 32 }} />
    </Box>
  );
};

export default Logo;

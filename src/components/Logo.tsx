import { Box } from '@mui/material';
import toast from 'react-hot-toast';

const Logo = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/assets/images/' : 'src/assets/images/';
  return (
    <Box
      onClick={() => toast.success('Hello World')}
      sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' }, position: 'absolute' }}
    >
      <img src={`${basePath}logo.png`} alt="brandname" style={{ height: 32 }} />
    </Box>
  );
};

export default Logo;

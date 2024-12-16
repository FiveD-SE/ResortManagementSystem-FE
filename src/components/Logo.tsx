import { Box } from '@mui/material';
import toast from 'react-hot-toast';

const Logo = () => {
  return (
    <Box
      onClick={() => toast.success('Hello World')}
      sx={{ cursor: 'pointer', display: { xs: 'none', sm: 'block' }, position: 'absolute' }}
    >
      <img src="/src/assets/images/logo.png" alt="brandname" style={{ height: 32 }} />
    </Box>
  );
};

export default Logo;

import { FacebookRounded, GitHub } from '@mui/icons-material';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { IAccount, Role } from '../types';

const Footer = ({ currentUser }: { currentUser?: IAccount | null }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: currentUser?.role === Role.Admin ? 'none' : 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 2.5,
        px: { xs: 2, sm: 5, md: 10 },
        py: 0,
        backgroundColor: 'gray.50',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: 1.5, sm: 5 },
          px: 0,
          py: 2,
          width: '100%',
          borderTop: `1px solid`,
          borderTopColor: 'black.50',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            © 2024 brandname, Inc
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            •
          </Typography>
          <Link variant="body2" href="/" underline="hover" sx={{ color: 'black.500' }}>
            Terms
          </Link>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            •
          </Typography>
          <Link variant="body2" href="/" underline="hover" sx={{ color: 'black.500' }}>
            Privacy
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton href="https://github.com/sloweyyy" target="_blank">
            <GitHub sx={{ width: 24, height: 24, color: 'black.900' }} />
          </IconButton>
          <IconButton href="https://www.facebook.com/slowey.ipynb" target="_blank">
            <FacebookRounded sx={{ width: 24, height: 24, color: 'blue.600' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

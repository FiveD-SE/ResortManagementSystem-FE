import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material';
import PaymentDropdownMenu from './PaymentDropdownMenu';
import { useState } from 'react';
import { ExpandMoreRounded } from '@mui/icons-material';

interface HandleClickEvent {
  currentTarget: EventTarget & HTMLDivElement;
}

const Payment = () => {
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: HandleClickEvent) => {
    setIsGuestMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsGuestMenuOpen(false);
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 2,
        pt: 2,
        pb: 1.5,
        px: 0,
        borderTop: 1,
        borderColor: 'black.50',
        position: 'relative',
      }}
    >
      <Typography variant="h6" component="div" sx={{ color: 'black.500' }}>
        Payment
      </Typography>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 1.5,
          width: '100%',
          borderRadius: 2,
          border: 1,
          borderColor: 'black.100',
          position: 'relative',
        }}
        onClick={handleClick}
      >
        <Avatar src="/src/assets/icons/payos.svg" sx={{ width: 32, height: 32, backgroundColor: 'black.100' }} />
        <Typography variant="body2" sx={{ flex: 1, color: 'black.500', fontWeight: 500 }}>
          PayOS
        </Typography>
        <IconButton size="small">
          <ExpandMoreRounded />
        </IconButton>
      </Paper>
      <PaymentDropdownMenu anchorEl={anchorEl} open={isGuestMenuOpen} onClose={handleClose} />
    </Box>
  );
};

export default Payment;

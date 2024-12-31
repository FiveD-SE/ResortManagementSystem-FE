import { Box, IconButton, Paper, Typography } from '@mui/material';
import PaymentDropdownMenu from './PaymentDropdownMenu';
import { useState } from 'react';
import { ExpandMoreRounded } from '@mui/icons-material';

interface HandleClickEvent {
  currentTarget: EventTarget & HTMLDivElement;
}

interface PaymentProps {
  selectedPaymentMethod: {
    icon: JSX.Element;
    text: string;
  };
  handlePaymentMethodSelect: (method: { icon: JSX.Element; text: string }) => void;
}

const Payment = ({ selectedPaymentMethod, handlePaymentMethodSelect }: PaymentProps) => {
  const [isPaymentMenuOpen, setIsPaymentMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: HandleClickEvent) => {
    setIsPaymentMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsPaymentMenuOpen(false);
    setAnchorEl(null);
  };

  const onPaymentMethodSelect = (method: { icon: JSX.Element; text: string }) => {
    handlePaymentMethodSelect(method);
    handleClose();
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
        {selectedPaymentMethod.icon}
        <Typography variant="body2" sx={{ flex: 1, color: 'black.500', fontWeight: 500 }}>
          {selectedPaymentMethod.text}
        </Typography>
        <IconButton size="small">
          <ExpandMoreRounded
            sx={{
              transition: 'transform 0.2s ease-in-out',
              transform: isPaymentMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </IconButton>
      </Paper>
      <PaymentDropdownMenu
        anchorEl={anchorEl}
        open={isPaymentMenuOpen}
        onClose={handleClose}
        onSelect={onPaymentMethodSelect}
      />
    </Box>
  );
};

export default Payment;

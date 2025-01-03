import { AccountBalanceRounded, PaymentsRounded } from '@mui/icons-material';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { MenuProps } from '@mui/material';

interface PaymentDropdownMenuProps {
  anchorEl: MenuProps['anchorEl'];
  open: boolean;
  onClose: () => void;
  onSelect: (method: { icon: JSX.Element; text: string }) => void;
}

const PaymentDropdownMenu = ({ anchorEl, open, onClose, onSelect }: PaymentDropdownMenuProps) => {
  const paymentMethods = [
    {
      icon: <PaymentsRounded sx={{ color: 'black.500' }} />,
      text: 'Pay on arrival',
    },
    {
      icon: <AccountBalanceRounded sx={{ color: 'black.500' }} />,
      text: 'Transfer',
    },
  ];

  const handleClose = () => {
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            sm: '35%',
          },
          borderRadius: '0.75rem',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {paymentMethods.map((method) => (
          <MenuItem
            key={method.text}
            onClick={() => {
              onSelect(method);
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 1,
              px: 2,
              cursor: 'pointer',
              ':hover': { backgroundColor: 'gray.50' },
              transition: 'background-color 0.2s',
            }}
          >
            {method.icon}
            <Typography variant="body2" sx={{ flex: 1, color: 'black.500', fontWeight: '500' }}>
              {method.text}
            </Typography>
          </MenuItem>
        ))}
      </Box>
    </Menu>
  );
};

export default PaymentDropdownMenu;

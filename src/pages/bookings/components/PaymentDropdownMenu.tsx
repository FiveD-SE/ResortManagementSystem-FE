import { Avatar, Box, Menu, Typography } from '@mui/material';
import { MenuProps } from '@mui/material';

interface PaymentDropdownMenuProps {
  anchorEl: MenuProps['anchorEl'];
  open: boolean;
  onClose: () => void;
}

const PaymentDropdownMenu = ({ anchorEl, open, onClose }: PaymentDropdownMenuProps) => {
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
      PaperProps={{ sx: { width: '40%', borderRadius: '0.75rem' } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box
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
          <Avatar src="/src/assets/icons/payos.svg" sx={{ width: 32, height: 32, backgroundColor: 'black.100' }} />
          <Typography variant="body2" sx={{ flex: 1, color: 'black.500', fontWeight: '500' }}>
            PayOS
          </Typography>
        </Box>
      </Box>
    </Menu>
  );
};

export default PaymentDropdownMenu;

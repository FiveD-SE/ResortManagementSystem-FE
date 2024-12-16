import { useState, useCallback } from 'react';
import { Avatar, Box, Divider, Menu, MenuItem } from '@mui/material';
import { MenuRounded } from '@mui/icons-material';
import { User } from '../types';

const menuStyles = {
  display: { xs: 'none', sm: 'flex' },
  py: 0.5,
  px: 1,
  border: '1px solid',
  borderColor: 'black.50',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 2,
  borderRadius: '9999px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  '&:hover': { boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  transition: 'box-shadow 0.3s',
};

export const UserMenu = ({ currentUser }: { currentUser?: User | null }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const avatarSrc = currentUser?.image || '/assets/avatar.png';

  const menuItems = currentUser ? (
    <>
      <MenuItem onClick={() => console.log('Go to My Trips')}>My Trips</MenuItem>
      <MenuItem onClick={() => console.log('Go to My Favorites')}>My Favorites</MenuItem>
      <MenuItem onClick={() => console.log('Go to My Reservations')}>My Reservations</MenuItem>
      <MenuItem onClick={() => console.log('Go to My Properties')}>My Properties</MenuItem>
      <Divider />
      <MenuItem onClick={() => console.log('Logout')}>Logout</MenuItem>
    </>
  ) : (
    <>
      <MenuItem sx={{ fontSize: '0.875rem', fontWeight: 500 }}>Login</MenuItem>
      <MenuItem sx={{ fontSize: '0.875rem', fontWeight: 500 }}>Sign Up</MenuItem>
    </>
  );

  return (
    <Box>
      <Box sx={menuStyles} onClick={handleMenuOpen}>
        <MenuRounded sx={{ color: 'black.900' }} />
        <Avatar src={avatarSrc} alt="Avatar" sx={{ width: '30px', height: '30px' }} />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { width: '10%', borderRadius: '0.75rem' } }}
      >
        {menuItems}
      </Menu>
    </Box>
  );
};

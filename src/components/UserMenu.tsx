import { useState, useCallback, Fragment } from 'react';
import { Avatar, Box, Divider, Menu, MenuItem } from '@mui/material';
import { MenuRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { IAccount } from '../types';
import useLogout from '../utils/useLogout';
import PopupModal from './PopupModal';

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

export const UserMenu = ({ currentUser }: { currentUser?: IAccount | null }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openPopupModal, setOpenPopupModal] = useState(false);
  const navigate = useNavigate();

  const logout = useLogout();

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const goToSignIn = useCallback(() => {
    navigate(ROUTES.AUTH.LOGIN);
    handleMenuClose();
  }, [navigate]);

  const goToSignUp = useCallback(() => {
    navigate(ROUTES.AUTH.REGISTER);
    handleMenuClose();
  }, [navigate]);

  const goToMyProfile = useCallback(() => {
    navigate(ROUTES.PROFILE);
    handleMenuClose();
  }, [navigate]);

  const handleLogout = useCallback(() => {
    navigate(ROUTES.AUTH.LOGIN);
    logout();
    handleMenuClose();
    setOpenPopupModal(false);
  }, [navigate, logout]);

  const avatarSrc = currentUser?.avatar || '/assets/avatar.png';

  const menuItems = currentUser ? (
    <Fragment>
      <MenuItem onClick={goToMyProfile}>My Profile</MenuItem>
      <MenuItem onClick={() => console.log('Go to My Favorites')}>My Favorites</MenuItem>
      <MenuItem onClick={() => console.log('Go to My Reservations')}>My Reservations</MenuItem>
      <Divider />
      <MenuItem onClick={() => setOpenPopupModal(true)}>Logout</MenuItem>
    </Fragment>
  ) : (
    <Fragment>
      <MenuItem sx={{ fontSize: '0.875rem', fontWeight: 500 }} onClick={goToSignIn}>
        Login
      </MenuItem>
      <MenuItem sx={{ fontSize: '0.875rem', fontWeight: 500 }} onClick={goToSignUp}>
        Sign Up
      </MenuItem>
    </Fragment>
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
        PaperProps={{ sx: { borderRadius: '0.75rem', mt: 1 } }}
      >
        {menuItems}
      </Menu>
      <PopupModal
        type={'confirm'}
        open={openPopupModal}
        title={'Logout'}
        message={'Are you sure you want to logout?'}
        onClose={() => { setOpenPopupModal(false); handleMenuClose() }}
        onConfirm={handleLogout}
      />
    </Box>
  );
};

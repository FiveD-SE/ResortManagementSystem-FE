import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, useMediaQuery } from '@mui/material';
import {
  AccountCircleRounded,
  FavoriteRounded,
  FlightRounded,
  HomeRounded,
  LogoutRounded,
  PersonAddRounded,
  VpnKeyRounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const SpeedDialMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isAuthenticated = false;

  const actions = isAuthenticated
    ? [
        { icon: <FlightRounded />, name: 'My Trips', route: '/my-trips' },
        { icon: <FavoriteRounded />, name: 'My Favorites', route: '/my-favorites' },
        { icon: <HomeRounded />, name: 'My Properties', route: '/my-properties' },
        { icon: <LogoutRounded />, name: 'Logout', route: ROUTES.AUTH.LOGOUT },
      ]
    : [
        { icon: <VpnKeyRounded />, name: 'Login', route: ROUTES.AUTH.LOGIN },
        { icon: <PersonAddRounded />, name: 'Sign Up', route: ROUTES.AUTH.REGISTER },
        { icon: <HomeRounded />, name: 'Home', route: ROUTES.HOME },
      ];

  if (!isSmallScreen) return null;

  return (
    <SpeedDial
      ariaLabel="User Menu"
      sx={{ position: 'fixed', bottom: 12, left: 12 }}
      icon={<SpeedDialIcon openIcon={<AccountCircleRounded />} />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            setOpen(false);
            navigate(action.route);
          }}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialMenu;

import { AppBar, Box, Toolbar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import Search from './Search';
import { UserMenu } from './UserMenu';
import { IAccount } from '../types';

const Navbar = ({ currentUser }: { currentUser?: IAccount | null }) => {
  const location = useLocation();
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    setIsAuthPage(location.pathname.includes('login') || location.pathname.includes('register'));
  }, [location.pathname]);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white.50',
        boxShadow: { xs: 0, sm: '0px 2px 5px rgba(0, 0, 0, 0.1)' },
        transition: 'box-shadow 0.3s',
        py: { xs: 1, sm: 2 },
        display: { xs: isAuthPage ? 'none' : 'block' },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }} />
        <Search />
        <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }} />
        <UserMenu currentUser={currentUser} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

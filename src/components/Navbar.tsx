import { AppBar, Box, Toolbar } from '@mui/material';
import Logo from './Logo';
import Search from './Search';
import { UserMenu } from './UserMenu';
import { IAccount } from '../types';

const Navbar = ({ currentUser }: { currentUser?: IAccount | null }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white.50',
        boxShadow: { xs: 0, sm: '0px 2px 5px rgba(0, 0, 0, 0.1)' },
        transition: 'box-shadow 0.3s',
        py: { xs: 1, sm: 2 },
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

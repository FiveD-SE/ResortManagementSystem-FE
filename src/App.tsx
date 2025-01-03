import { Box } from '@mui/material';
import Routing from './routes/Routing';
import Navbar from './components/Navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import Footer from './components/Footer';
import SpeedDialMenu from './components/SpeedDialMenu';
import { useAppSelector } from './stores/store';
import Sidebar from './components/Sidebar';
import { Role } from './types';

const App = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <>
      {user?.role === Role.Admin ? (
        <Box display="flex">
          <Sidebar />
          <Box flex={1}>
            <Routing />
          </Box>
        </Box>
      ) : (
        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar currentUser={user} />
          <Box sx={{ flexGrow: 1 }}>
            <Routing />
          </Box>
          <Footer currentUser={user} />
          <ScrollToTopButton />
          <SpeedDialMenu />
        </Box>
      )}
      ;
    </>
  );
};

export default App;

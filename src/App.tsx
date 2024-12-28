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
      <Box>
        <Navbar currentUser={user} />
        <Routing />
        <Footer />
        <ScrollToTopButton />
        <SpeedDialMenu />
      </Box>

      {user?.role === Role.Admin && (
        <Box display="flex">
          <Sidebar />
          <Box flex={1}>
            <Routing />
          </Box>
        </Box>
      )}
    </>
  );
};

export default App;

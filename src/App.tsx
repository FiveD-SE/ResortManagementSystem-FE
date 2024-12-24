import { Box } from '@mui/material';
import Routing from './routes/Routing';
import Navbar from './components/Navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import Footer from './components/Footer';
import SpeedDialMenu from './components/SpeedDialMenu';

const App = () => {
  return (
    <Box>
      <Navbar />
      <Routing />
      <Footer />
      <ScrollToTopButton />
      <SpeedDialMenu />
    </Box>
  );
};

export default App;

import { Box } from '@mui/material';
import Routing from './routes/Routing';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Box>
      <Navbar />
      <Routing />
    </Box>
  );
};

export default App;

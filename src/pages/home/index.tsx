import { Box } from '@mui/material';
import Categories from './components/Categories';
import AccommodationList from './components/AccommodationList';
import React from 'react';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: 'white.50' }}>
      <Categories />
      <AccommodationList />
    </Box>
  );
};

export default Home;

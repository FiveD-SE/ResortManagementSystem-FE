import { Box, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import BookingList from './BookingList';

const BookingTab = () => {
  const [value, setValue] = React.useState(0);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // if (newValue === 0) {
    //   setFilteredBookings(bookings);
    // } else if (newValue === 1) {
    //   setFilteredBookings(bookings.filter((booking) => booking.status === 'Checked in'));
    // } else if (newValue === 2) {
    //   setFilteredBookings(bookings.filter((booking) => booking.status === 'Pending'));
    // } else if (newValue === 3) {
    //   setFilteredBookings(bookings.filter((booking) => booking.status === 'Checked out'));
    // }
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{ minWidth: '50%', maxWidth: '60%' }}
        >
          <Tab icon={<AppsIcon />} label="All" {...a11yProps(0)} sx={{ width: '50%' }} iconPosition="start" />
          <Tab icon={<HomeIcon />} label="Pending" {...a11yProps(1)} sx={{ width: '50%' }} iconPosition="start" />
          <Tab icon={<DirectionsCarIcon />} label="Check-in" {...a11yProps(2)} sx={{ width: '50%' }} iconPosition="start" />
          <Tab icon={<NoCrashIcon />} label="Check-out" {...a11yProps(3)} sx={{ width: '50%' }} iconPosition="start" />
        </Tabs>
      </Box>
      <Box role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-0`} aria-labelledby={`simple-tab-0`}>
        <BookingList />
      </Box>
      <Box role="tabpanel" hidden={value !== 2} id={`simple-tabpanel-1`} aria-labelledby={`simple-tab-1`}>
        <BookingList type="checked in" />
      </Box>
      <Box role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-2`} aria-labelledby={`simple-tab-2`}>
        <BookingList type="pending" />
      </Box>
      <Box role="tabpanel" hidden={value !== 3} id={`simple-tabpanel-2`} aria-labelledby={`simple-tab-2`}>
        <BookingList type="checked out" />
      </Box>
    </Box>
  );
};

export default BookingTab;

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Header from './Header';
import BookingTab from './Tabs/BookingTab';
import { ITrip } from '../../../types';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const fakeData: ITrip[] = [
  {
    id: 1,
    name: 'Trip 1',
    startDate: 'Dec 1, 2021',
    endDate: 'Dec 5, 2021',
    status: 'Upcoming',
    amount: 2,
  },
  {
    id: 2,
    name: 'Trip 2',
    startDate: 'Nov 1, 2021',
    endDate: 'Nov 5, 2021',
    status: 'Upcoming',
    amount: 3,
  },
  {
    id: 3,
    name: 'Trip 3',
    startDate: 'July 22, 2021',
    endDate: 'July 26, 2021',
    status: 'Cancelled',
    amount: 4,
  },
  {
    id: 4,
    name: 'Trip 4',
    startDate: 'Janurary 1, 2021',
    endDate: 'Janurary 5, 2021',
    status: 'Past',
    amount: 5,
  },
];

const TripPage = () => {
  const [value, setValue] = React.useState(0);
  const [filteredTrips, setFilteredTrips] = React.useState(fakeData.filter((trip) => trip.status === 'Upcoming'));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const filteredTrips = fakeData.filter((trip) => {
      if (newValue === 0) return trip.status === 'Upcoming';
      if (newValue === 1) return trip.status === 'Past';
      if (newValue === 2) return trip.status === 'Cancelled';
    });
    setFilteredTrips(filteredTrips);
  };

  return (
    <Box sx={{ width: '100%', paddingX: 8 }}>
      <Header haveBackNav={false} title="Booking" />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{ width: '25vw' }}
        >
          <Tab label="Upcoming" {...a11yProps(0)} sx={{ width: '100%' }} />
          <Tab label="Past" {...a11yProps(1)} sx={{ width: '100%' }} />
          <Tab label="Cancel" {...a11yProps(2)} sx={{ width: '100%' }} />
        </Tabs>
      </Box>
      <Box role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-0`} aria-labelledby={`simple-tab-0`}>
        <BookingTab trips={filteredTrips} type="Upcoming" />
      </Box>
      <Box role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-1`} aria-labelledby={`simple-tab-1`}>
        <BookingTab trips={filteredTrips} type="Past" />
      </Box>
      <Box role="tabpanel" hidden={value !== 2} id={`simple-tabpanel-2`} aria-labelledby={`simple-tab-2`}>
        <BookingTab trips={filteredTrips} type="Cancelled" />
      </Box>
    </Box>
  );
};

export default TripPage;

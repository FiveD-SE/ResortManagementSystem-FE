import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UpcomingTab from './Tabs/UpcomingTab';
import PastTab from './Tabs/PastTab';
import CancelTab from './Tabs/CancelTab';
import Header from './Header';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TripPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', paddingX: 8 }}>
      <Header haveBackNav={false} />
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
        <UpcomingTab />
      </Box>
      <Box role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-1`} aria-labelledby={`simple-tab-1`}>
        <PastTab />
      </Box>
      <Box role="tabpanel" hidden={value !== 2} id={`simple-tabpanel-2`} aria-labelledby={`simple-tab-2`}>
        <CancelTab />
      </Box>
    </Box>
  );
};

export default TripPage;

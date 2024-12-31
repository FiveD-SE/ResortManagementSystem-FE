import { Box, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ServiceList from './ServiceList';
import { IServiceStaffDashboardProps } from '../../../type';

const services: IServiceStaffDashboardProps[] = [
  {
    id: 'sadas',
    name: 'Service 1',
    roomNumber: '21312312',
    Date: '2021-10-10',
    status: 'Pending',
    totalAmount: 100,
  },
  {
    id: 'sadas',
    name: 'Service 2',
    roomNumber: '21312312',
    Date: '2021-10-10',
    status: 'Served',
    totalAmount: 100,
  },
  {
    id: 'sadas',
    name: 'Service 3',
    roomNumber: '21312312',
    Date: '2021-10-10',
    status: 'Pending',
    totalAmount: 100,
  },
  {
    id: 'sadas',
    name: 'Service 4',
    roomNumber: '21312312',
    Date: '2021-10-10',
    status: 'Served',
    totalAmount: 100,
  },
  {
    id: 'sadas',
    name: 'Service 5',
    roomNumber: '21312312',
    Date: '2021-10-10',
    status: 'Pending',
    totalAmount: 100,
  },
  {
    id: 'sadas',
    name: 'Service 6',
    roomNumber: '21312312',
    Date: '2021-10-10',
    status: 'Served',
    totalAmount: 100,
  },
  {
    id: 'sadas',
    name: 'Service 7',
    roomNumber: '21312312',
    Date: '2021-10-10',
    status: 'Pending',
    totalAmount: 100,
  },
  {
    id: 'sadas',
    name: 'Service 8',
    roomNumber: '21312312',
    Date: '2021-10-10',
    status: 'Served',
    totalAmount: 100,
  },
  {
    id: 'sadas',
    name: 'Service 9',
    roomNumber: '21312312',
    Date: '2021-10-10',
    status: 'Pending',
    totalAmount: 100,
  },
  {
    id: 'sadas',
    name: 'Service 10',
    roomNumber: '21312312',
    Date: '2021-10-10',
    status: 'Served',
    totalAmount: 100,
  },
];

const ServiceTab = () => {
  const [value, setValue] = React.useState(0);
  const [filteredServices, setFilteredServices] = React.useState(services);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setFilteredServices(services);
    } else if (newValue === 1) {
      setFilteredServices(services.filter((service) => service.status === 'Pending'));
    } else if (newValue === 2) {
      setFilteredServices(services.filter((service) => service.status === 'Served'));
    }
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
          sx={{ width: '25vw' }}
        >
          <Tab icon={<AppsIcon />} label="All" {...a11yProps(0)} sx={{ width: '50%' }} iconPosition="start" />
          <Tab icon={<CheckCircleIcon />} label="Pending" {...a11yProps(1)} sx={{ width: '50%' }} iconPosition="start" />
          <Tab icon={<PauseCircleIcon />} label="Served" {...a11yProps(2)} sx={{ width: '50%' }} iconPosition="start" />
        </Tabs>
      </Box>
      <Box role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-0`} aria-labelledby={`simple-tab-0`}>
        <ServiceList />
      </Box>
      <Box role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-1`} aria-labelledby={`simple-tab-1`}>
        <ServiceList type="Pending" />
      </Box>
      <Box role="tabpanel" hidden={value !== 2} id={`simple-tabpanel-2`} aria-labelledby={`simple-tab-2`}>
        <ServiceList type="Served" />
      </Box>
    </Box>
  );
};

export default ServiceTab;

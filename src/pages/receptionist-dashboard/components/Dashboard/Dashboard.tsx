import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TotalCard from './components/TotalCard';
import BookingTab from './components/BookingTab';
import { IReceptionistDashboard } from '../../type';
import * as React from 'react';
import { useGetBookingsQuery } from '../../../../apis/bookingApi';
import { IBooking } from '../../../../types';

const bookings: IReceptionistDashboard[] = [
  {
    id: '1',
    guestName: 'John Doe',
    roomNumber: '101',
    roomType: 'Single',
    status: 'Staying',
    totalAmount: 100,
  },
  {
    id: '2',
    guestName: 'Jane Doe',
    roomNumber: '102',
    roomType: 'Double',
    status: 'Check-out',
    totalAmount: 200,
  },
  {
    id: '3',
    guestName: 'John Doe',
    roomNumber: '103',
    roomType: 'Single',
    status: 'Check-out',
    totalAmount: 100,
  },
  {
    id: '4',
    guestName: 'Jane Doe',
    roomNumber: '104',
    roomType: 'Double',
    status: 'Check-in',
    totalAmount: 200,
  },
  {
    id: '5',
    guestName: 'John Doe',
    roomNumber: '105',
    roomType: 'Single',
    status: 'Check-out',
    totalAmount: 100,
  },
  {
    id: '6',
    guestName: 'Jane Doe',
    roomNumber: '106',
    roomType: 'Double',
    status: 'Staying',
    totalAmount: 200,
  },
  {
    id: '7',
    guestName: 'John Doe',
    roomNumber: '107',
    roomType: 'Single',
    status: 'Staying',
    totalAmount: 100,
  },
  {
    id: '8',
    guestName: 'Jane Doe',
    roomNumber: '108',
    roomType: 'Double',
    status: 'Check-out',
    totalAmount: 200,
  },
  {
    id: '9',
    guestName: 'John Doe',
    roomNumber: '109',
    roomType: 'Single',
    status: 'Staying',
    totalAmount: 100,
  },
  {
    id: '10',
    guestName: 'Jane Doe',
    roomNumber: '110',
    roomType: 'Double',
    status: 'Check-in',
    totalAmount: 200,
  },
];

const Dashboard = () => {
  const { data, isLoading } = useGetBookingsQuery({ page: 1, limit: 5 });
  const [totalCheckIn, setTotalCheckIn] = React.useState(0);
  const [totalStaying, setTotalStaying] = React.useState(0);
  const [totalCheckOut, setTotalCheckOut] = React.useState(0);

  React.useEffect(() => {
    if (data) {
      setTotalCheckIn(data.docs.filter((booking) => booking.status === 'Checked in').length);
      setTotalStaying(data.docs.filter((booking) => booking.status === 'Pending').length);
      setTotalCheckOut(data.docs.filter((booking) => booking.status === 'Checked out').length);
    }
  });
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        <Grid size={4}>
          <TotalCard amount={totalCheckIn} type="Check-in" />
        </Grid>
        <Grid size={4}>
          <TotalCard amount={totalStaying} type="Staying" />
        </Grid>
        <Grid size={4}>
          <TotalCard amount={totalCheckOut} type="Check-out" />
        </Grid>
      </Grid>

      {!isLoading && data && (
        <Box sx={{ marginTop: 4 }}>
          <BookingTab bookings={data.docs} />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;

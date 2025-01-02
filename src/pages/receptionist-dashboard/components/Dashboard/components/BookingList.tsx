import {
  Box,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as React from 'react';
import { IBooking } from '../../../../../types';
import DropdownList from './DropdownList';
import { useGetBookingsQuery } from '../../../../../apis/bookingApi';
import BookingInformationModal from '../../../../admin-booking-management/components/BookingInformationModal';
import DetailBookingModal from './Modal/DetailBookingModal';

interface IProps {
  type?: 'checked in' | 'pending' | 'checked out';
}

const BookingList = (props: IProps) => {
  const [page, setPage] = React.useState(1);
  const { data, isFetching } = useGetBookingsQuery({ page: page, limit: 5, ...(props.type && { filter: props.type }) });
  const [bookings, setBookings] = React.useState<IBooking[]>([]);
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const [booking, setBooking] = React.useState<IBooking | null>(null);
  React.useEffect(() => {
    if (data) {
      setBookings(data?.docs);
    }
  }, [data]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
      <Box sx={{ minHeight: '46vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ height: '6vh' }}>
              <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                <TableCell width="20%">ID</TableCell>
                <TableCell width="10%">Guest Name</TableCell>
                <TableCell width="10%">Room Number</TableCell>
                <TableCell width="10%">Room Type</TableCell>
                <TableCell width="10%">Status</TableCell>
                <TableCell width="10%">Total Amount</TableCell>
                <TableCell width="10%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isFetching || data === undefined ? (
                <TableRow sx={{ height: '40vh' }}>
                  <TableCell colSpan={7} align="center">
                    <Box sx={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : bookings.length === 0 ? (
                <TableRow sx={{ height: '8vh' }}>
                  <TableCell colSpan={7} align="center">
                    No booking found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((row, index) => (
                  <TableRow key={index} sx={{ height: '8vh' }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.customerId.firstName + row.customerId.lastName}</TableCell>
                    <TableCell>{row.roomId.roomNumber}</TableCell>
                    <TableCell>{row.roomId.roomTypeId.typeName}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{`$${row.totalAmount}`}</TableCell>
                    <TableCell align="center">
                      <DropdownList
                        id={row.id}
                        key={index}
                        setData={setBookings}
                        type={row.status}
                        openDetailModal={() => {
                          setOpenDetailModal(true);
                          setBooking(row);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Pagination
        count={data?.totalPages ?? 0}
        variant="outlined"
        shape="rounded"
        sx={{ marginTop: 2, alignSelf: 'flex-end' }}
        onChange={(e, value) => setPage(value)}
      />
      <DetailBookingModal open={openDetailModal} onClose={() => setOpenDetailModal(false)} data={booking} />
    </Box>
  );
};

export default BookingList;

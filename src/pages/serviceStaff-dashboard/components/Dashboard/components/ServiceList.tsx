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
import { useGetBookingServicesQuery } from '../../../../../apis/bookingApi';
import { IBookingService } from '../../../../../types';

interface IProps {
  type?: 'Served' | 'Pending';
}

const convertDateTime = (date: Date) => {
  return new Date(date).toLocaleDateString('en-GB');
};

const ServiceList = (props: IProps) => {
  const [page, setPage] = React.useState(1);
  const { data, isFetching } = useGetBookingServicesQuery({
    page: page,
    limit: 5,
    ...(props.type && { status: props.type }),
  });
  const [services, setServices] = React.useState<IBookingService[]>([]);

  React.useEffect(() => {
    if (data) {
      setServices(data?.docs);
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
                <TableCell width="10%">Service Name</TableCell>
                <TableCell width="10%">Room Number</TableCell>
                <TableCell width="10%">Date</TableCell>
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
              ) : services.length === 0 ? (
                <TableRow sx={{ height: '8vh' }}>
                  <TableCell colSpan={7} align="center">
                    No booking found
                  </TableCell>
                </TableRow>
              ) : (
                services.map((row, index) => (
                  <TableRow key={index} sx={{ height: '8vh' }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.serviceName}</TableCell>
                    <TableCell>{row.roomNumber}</TableCell>
                    <TableCell>{convertDateTime(row.checkinDate)}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{`$${row.price}`}</TableCell>
                    <TableCell align="center">
                      {/* <DropdownList
                        id={row.id}
                        key={index}
                        setData={setBookings}
                        type={row.status}
                      /> */}
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
    </Box>
  );
};

export default ServiceList;

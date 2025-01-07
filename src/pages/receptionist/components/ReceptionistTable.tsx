import { MoreHoriz } from '@mui/icons-material';
import {
  Box,
  Tab,
  Tabs,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  MenuItem,
  IconButton,
  Menu,
  TextField,
} from '@mui/material';
import { Apps, PaidRounded, PendingActionsRounded } from '@mui/icons-material';
import BookingDetailModal from './BookingDetailModal';
import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { IBooking, IBookingApiResponse } from '../../../types/booking';
import { formatPrice } from '../../../utils';
import { useCheckinMutation, useCheckoutMutation } from '../../../apis/bookingApi';
import toast from 'react-hot-toast';

const tabTextStyle = {
  color: 'gray.200',
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'none',
  '&.Mui-selected': {
    color: 'primary.500',
  },
};

const tabIconStyle = {
  fontSize: '18px',
};

interface ReceptionistTableProps {
  pendingBookingData: IBookingApiResponse | undefined;
  checkedInBookingData: IBookingApiResponse | undefined;
  checkedOutBookingData: IBookingApiResponse | undefined;
  onBookingUpdate: () => void;
}

interface IBookingRow {
  id: string;
  roomType: string;
  roomNumber: string;
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: string;
}

const ReceptionistTable = ({
  pendingBookingData,
  checkedInBookingData,
  checkedOutBookingData,
  onBookingUpdate,
}: ReceptionistTableProps) => {
  const [checkin] = useCheckinMutation();
  const [checkout] = useCheckoutMutation();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<{ [key: string]: HTMLElement | null }>({});
  const [tabSelected, setTabSelected] = React.useState(0);
  const [selectedBooking, setSelectedBooking] = React.useState<IBooking>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pendingBooking, setPendingBooking] = React.useState<IBookingRow[]>([]);
  const [checkedInBooking, setCheckedInBooking] = React.useState<IBookingRow[]>([]);
  const [checkedOutBooking, setCheckedOutBooking] = React.useState<IBookingRow[]>([]);
  const [search, setSearch] = React.useState('');

  const handleSelectBooking = (id: string, status: string) => {
    if (status === 'Pending') {
      setSelectedBooking(pendingBookingData?.docs.find((booking) => booking.id === id));
    }
    if (status === 'Checked in') {
      setSelectedBooking(checkedInBookingData?.docs.find((booking) => booking.id === id));
    }
    if (status === 'Checked out') {
      setSelectedBooking(checkedOutBookingData?.docs.find((booking) => booking.id === id));
    }
  };

  const allBookings = React.useMemo(() => {
    const pendingBookings = pendingBookingData?.docs.map((booking) => ({
      id: booking.id,
      roomType: booking.roomId.roomTypeId.typeName,
      roomNumber: booking.roomId.roomNumber,
      customerName: booking.customerId.firstName + ' ' + booking.customerId.lastName,
      checkInDate: dayjs(booking.checkinDate).format('YYYY/MM/DD'),
      checkOutDate: dayjs(booking.checkoutDate).format('YYYY/MM/DD'),
      totalAmount: booking.totalAmount,
      status: booking.status,
    }));

    setPendingBooking(pendingBookings || []);

    const checkedInBookings = checkedInBookingData?.docs.map((booking) => ({
      id: booking.id,
      roomType: booking.roomId.roomTypeId.typeName,
      roomNumber: booking.roomId.roomNumber,
      customerName: booking.customerId.firstName + ' ' + booking.customerId.lastName,
      checkInDate: dayjs(booking.checkinDate).format('YYYY/MM/DD'),
      checkOutDate: dayjs(booking.checkoutDate).format('YYYY/MM/DD'),
      totalAmount: booking.totalAmount,
      status: booking.status,
    }));

    setCheckedInBooking(checkedInBookings || []);

    const checkedOutBookings = checkedOutBookingData?.docs.map((booking) => ({
      id: booking.id,
      roomType: booking.roomId.roomTypeId.typeName,
      roomNumber: booking.roomId.roomNumber,
      customerName: booking.customerId.firstName + ' ' + booking.customerId.lastName,
      checkInDate: dayjs(booking.checkinDate).format('YYYY/MM/DD'),
      checkOutDate: dayjs(booking.checkoutDate).format('YYYY/MM/DD'),
      totalAmount: booking.totalAmount,
      status: booking.status,
    }));

    setCheckedOutBooking(checkedOutBookings || []);

    return [...(pendingBookings || []), ...(checkedInBookings || []), ...(checkedOutBookings || [])];
  }, [pendingBookingData, checkedInBookingData, checkedOutBookingData]);

  const getFilteredRows = React.useCallback(() => {
    const lowerCaseSearch = search.toLowerCase();

    const filteredBookings = allBookings.filter((booking) =>
      booking.customerName.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomNumber.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomType.toLowerCase().includes(lowerCaseSearch)
    );

    const docsInCurrentPage = filteredBookings.slice((currentPage - 1) * 10, currentPage * 10);

    const filteredPending = pendingBooking.filter((booking) =>
      booking.customerName.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomNumber.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomType.toLowerCase().includes(lowerCaseSearch)
    );
    const pendingBookingsInCurrentPage = filteredPending.slice((currentPage - 1) * 10, currentPage * 10);

    const filteredCheckedIn = checkedInBooking.filter((booking) =>
      booking.customerName.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomNumber.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomType.toLowerCase().includes(lowerCaseSearch)
    );
    const checkedInBookingsInCurrentPage = filteredCheckedIn.slice((currentPage - 1) * 10, currentPage * 10);

    const filteredCheckedOut = checkedOutBooking.filter((booking) =>
      booking.customerName.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomNumber.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomType.toLowerCase().includes(lowerCaseSearch)
    );
    const checkedOutBookingsInCurrentPage = filteredCheckedOut.slice((currentPage - 1) * 10, currentPage * 10);

    return tabSelected === 0
      ? docsInCurrentPage
      : tabSelected === 1
        ? pendingBookingsInCurrentPage
        : tabSelected === 2
          ? checkedInBookingsInCurrentPage
          : checkedOutBookingsInCurrentPage;
  }, [allBookings, pendingBooking, checkedInBooking, checkedOutBooking, currentPage, tabSelected, search]);

  const filteredRows = React.useMemo(() => getFilteredRows(), [getFilteredRows]);

  const handleTabChange = (_event: React.ChangeEvent<unknown>, newValue: number) => {
    setTabSelected(newValue);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, rowId: string) => {
    setAnchorEl((prevAnchorEl) => ({ ...prevAnchorEl, [rowId]: event.currentTarget }));
  };

  const handleMenuClose = (rowId: string) => {
    setAnchorEl((prevAnchorEl) => ({ ...prevAnchorEl, [rowId]: null }));
  };

  const handleMenuItemClick = (row: IBookingRow, action: string) => {
    if (action === 'Check In') {
      checkin(row.id)
        .unwrap()
        .then(() => {
          toast.success('Checked in successfully');
          onBookingUpdate();
        })
        .catch((error) => {
          console.error('Check-in failed:', error);
        });
    } else if (action === 'Check Out') {
      checkout(row.id)
        .unwrap()
        .then(() => {
          toast.success('Checked out successfully');
          onBookingUpdate();
        })
        .catch((error) => {
          console.error('Checkout failed:', error);
        });
    } else if (action === 'View Detail') {
      const selectedBooking =
        tabSelected === 0
          ? allBookings.find((booking) => booking.id === row.id)
          : tabSelected === 1
            ? pendingBookingData?.docs.find((booking) => booking.id === row.id)
            : tabSelected === 2
              ? checkedInBookingData?.docs.find((booking) => booking.id === row.id)
              : checkedOutBookingData?.docs.find((booking) => booking.id === row.id);
      setSelectedBooking(selectedBooking as IBooking);
      setOpen(true);
    }
    handleMenuClose(row.id);
  };

  const getMenuItems = (status: string) => {
    const isToday = dayjs().isBetween(dayjs(selectedBooking?.checkinDate), dayjs(selectedBooking?.checkoutDate));
    if (status === 'Pending') {
      return isToday ? ['View Detail', 'Check In'] : ['View Detail'];
    } else if (status === 'Checked in') {
      return ['View Detail', 'Check Out'];
    } else if (status === 'Checked out') {
      return ['View Detail'];
    }
    return [];
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredCounts = React.useMemo(() => {
    const lowerCaseSearch = search.toLowerCase();

    const totalFiltered = allBookings.filter((booking) =>
      booking.customerName.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomNumber.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomType.toLowerCase().includes(lowerCaseSearch)
    ).length;

    const totalPendingFiltered = pendingBooking.filter((booking) =>
      booking.customerName.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomNumber.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomType.toLowerCase().includes(lowerCaseSearch)
    ).length;

    const totalCheckedInFiltered = checkedInBooking.filter((booking) =>
      booking.customerName.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomNumber.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomType.toLowerCase().includes(lowerCaseSearch)
    ).length;

    const totalCheckedOutFiltered = checkedOutBooking.filter((booking) =>
      booking.customerName.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomNumber.toLowerCase().includes(lowerCaseSearch) ||
      booking.roomType.toLowerCase().includes(lowerCaseSearch)
    ).length;

    return {
      all: Math.ceil(totalFiltered / 10),
      pending: Math.ceil(totalPendingFiltered / 10),
      checkedIn: Math.ceil(totalCheckedInFiltered / 10),
      checkedOut: Math.ceil(totalCheckedOutFiltered / 10),
    };
  }, [allBookings, pendingBooking, checkedInBooking, checkedOutBooking, search]);

  const count = tabSelected === 0
    ? filteredCounts.all
    : tabSelected === 1
      ? filteredCounts.pending
      : tabSelected === 2
        ? filteredCounts.checkedIn
        : filteredCounts.checkedOut;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
        {/* Custom Tabs */}
        <Tabs
          aria-label="custom tabs example"
          TabIndicatorProps={{ style: { backgroundColor: 'black.900', bottom: '12px' } }}
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '12px',
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: 'rgb(222, 222, 222)',
              zIndex: -1,
            },
          }}
          value={tabSelected}
          onChange={handleTabChange}
        >
          <Tab label="All booking" sx={tabTextStyle} icon={<Apps sx={tabIconStyle} />} iconPosition="start" disableRipple />
          <Tab
            label="Pending"
            sx={tabTextStyle}
            icon={<PendingActionsRounded sx={tabIconStyle} />}
            iconPosition="start"
            disableRipple
          />
          <Tab
            label="Checked In"
            sx={tabTextStyle}
            icon={<PaidRounded sx={tabIconStyle} />}
            iconPosition="start"
            disableRipple
          />
          <Tab
            label="Checked Out"
            sx={tabTextStyle}
            icon={<PaidRounded sx={tabIconStyle} />}
            iconPosition="start"
            disableRipple
          />
        </Tabs>

        {/* Search and Button */}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          {/* Search */}
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            size="small"
            value={search}
            onChange={handleSearchChange}
            sx={{
              bgcolor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": {
                  borderColor: "gray.200",
                },
                "&:hover fieldset": {
                  borderColor: "gray.200",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.500",
                  borderWidth: 1.5,
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray.500",
                "&.Mui-focused": {
                  color: "primary.500",
                },
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ minHeight: '85vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                <TableCell>ID</TableCell>
                <TableCell>Customer name</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Room type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No booking found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows?.map((row, index) => {
                  const menuItems = getMenuItems(row.status);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onClick={() => handleSelectBooking(row.id, row.status)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.customerName}</TableCell>
                      <TableCell>{row.roomNumber}</TableCell>
                      <TableCell>{row.roomType}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{formatPrice(row.totalAmount)}</TableCell>
                      <TableCell>
                        <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
                          <MoreHoriz />
                        </IconButton>
                      </TableCell>
                      <Menu
                        anchorEl={anchorEl[row.id] || null}
                        open={Boolean(anchorEl[row.id])}
                        onClose={() => handleMenuClose(row.id)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        sx={{
                          '& .MuiPaper-root': {
                            borderRadius: '8px',
                            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.02)',
                            padding: '4px',
                          },
                          '& .MuiMenuItem-root': {
                            padding: '4px 16px',
                            borderRadius: '4px',
                            '&:hover': {
                              backgroundColor: 'gray.50',
                            },
                            fontSize: '14px',
                            fontWeight: 600,
                            color: 'black.300',
                          },
                        }}
                      >
                        {menuItems?.map((item) => (
                          <MenuItem key={item} onClick={() => handleMenuItemClick(row, item)}>
                            {item}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        sx={{ marginTop: 2, alignSelf: 'flex-end' }}
        page={currentPage}
        onChange={handlePageChange}
      />

      <BookingDetailModal open={open} onClose={() => setOpen(false)} selectedBooking={selectedBooking} />
    </Box>
  );
};

export default ReceptionistTable;

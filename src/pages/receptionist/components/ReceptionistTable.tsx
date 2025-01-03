import { ArrowDropDown, MeetingRoom, MoreHoriz } from '@mui/icons-material'
import { Box, Tab, Tabs, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Pagination, FormControl, Select, MenuItem, InputAdornment, IconButton, Menu } from '@mui/material'
import { Apps, PaidRounded, PendingActionsRounded } from '@mui/icons-material'
import BookingDetailModal from './BookingDetailModal';
import React from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { SelectChangeEvent } from '@mui/material';
import { IBooking, IBookingApiResponse } from '../../../types/booking';
import { formatPrice } from '../../../utils';

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

const ReceptionistTable = ({ pendingBookingData, checkedInBookingData, checkedOutBookingData }: ReceptionistTableProps) => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedSearch, setSelectedSearch] = React.useState('Room Type');
    const [tabSelected, setTabSelected] = React.useState(0);
    const [search, setSearch] = React.useState('');
    const [selectedBooking, setSelectedBooking] = React.useState<IBooking>();
    const [count, setCount] = React.useState({
        all: 0,
        pending: 0,
        checkedIn: 0,
        checkedOut: 0
    });
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pendingBooking, setPendingBooking] = React.useState<IBookingRow[]>([]);
    const [checkedInBooking, setCheckedInBooking] = React.useState<IBookingRow[]>([]);
    const [checkedOutBooking, setCheckedOutBooking] = React.useState<IBookingRow[]>([]);

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
    }

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

        const totalAll = (pendingBookings?.length || 0) + (checkedInBookings?.length || 0) + (checkedOutBookings?.length || 0);
        const totalPending = pendingBookings?.length || 0;
        const totalCheckedIn = checkedInBookings?.length || 0;
        const totalCheckedOut = checkedOutBookings?.length || 0;

        setCount({
            all: Math.ceil(totalAll / 10),
            pending: Math.ceil(totalPending / 10),
            checkedIn: Math.ceil(totalCheckedIn / 10),
            checkedOut: Math.ceil(totalCheckedOut / 10),
        });

        return [
            ...(pendingBookings || []),
            ...(checkedInBookings || []),
            ...(checkedOutBookings || []),
        ];
    }, [pendingBookingData, checkedInBookingData, checkedOutBookingData]);

    const getFilteredRows = React.useCallback(() => {
        const docsInCurrentPage = allBookings.slice((currentPage - 1) * 10, currentPage * 10);
        const pendingBookingsInCurrentPage = pendingBooking.slice((currentPage - 1) * 10, currentPage * 10);
        const checkedInBookingsInCurrentPage = checkedInBooking.slice((currentPage - 1) * 10, currentPage * 10);
        const checkedOutBookingsInCurrentPage = checkedOutBooking?.slice((currentPage - 1) * 10, currentPage * 10);
        return tabSelected === 0
            ? docsInCurrentPage
            : tabSelected === 1
                ? pendingBookingsInCurrentPage
                : tabSelected === 2
                    ? checkedInBookingsInCurrentPage
                    : checkedOutBookingsInCurrentPage;
    }, [allBookings, currentPage, tabSelected, pendingBooking, checkedInBooking, checkedOutBooking]);

    const filteredRows = React.useMemo(() => getFilteredRows(), [getFilteredRows]);

    const handleTabChange = (_event: React.ChangeEvent<unknown>, newValue: number) => {
        setTabSelected(newValue);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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
                    <Tab
                        label="All booking"
                        sx={tabTextStyle}
                        icon={<Apps sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Pending"
                        sx={tabTextStyle}
                        icon={<PendingActionsRounded sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Checked In"
                        sx={tabTextStyle}
                        icon={<PaidRounded sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Checked Out"
                        sx={tabTextStyle}
                        icon={<PaidRounded sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                </Tabs>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <FormControl
                        variant="outlined"
                        size="small"
                        sx={{
                            bgcolor: 'white',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '& fieldset': {
                                    borderColor: 'gray.200',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'gray.200',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black.900',
                                    borderWidth: 1.5,
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black.900',
                                '&.Mui-focused': {
                                    color: 'black.500',
                                },
                            },
                        }}
                    >
                        <Select
                            value={selectedSearch}
                            onChange={(event: SelectChangeEvent) => setSelectedSearch(event.target.value)}
                            IconComponent={ArrowDropDown}
                            startAdornment={
                                <InputAdornment position="start">
                                    <MeetingRoom sx={{ color: "black.900" }} />
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="Room Type">Room Type</MenuItem>
                            <MenuItem value="Room Number">Room Number</MenuItem>
                            <MenuItem value="Check In Date">Check In Date</MenuItem>
                            <MenuItem value="Check Out Date">Check Out Date</MenuItem>
                            <MenuItem value="Status">Status</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="search"
                        label="Search"
                        variant="outlined"
                        size="small"
                        sx={{
                            bgcolor: 'white',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '& fieldset': {
                                    borderColor: 'gray.200',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'gray.200',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black.900',
                                    borderWidth: 1.5,
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black.900',
                                '&.Mui-focused': {
                                    color: 'black.500',
                                },
                            },
                        }}
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Box>
            </Box>

            <Box sx={{ minHeight: "85vh", borderRadius: 2, border: "1px solid rgb(222, 222, 222)" }}>
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
                                filteredRows?.map((row, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleSelectBooking(row.id, row.status)}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.customerName}</TableCell>
                                        <TableCell>{row.roomNumber}</TableCell>
                                        <TableCell>{row.roomType}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{formatPrice(row.totalAmount)}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={(event) => {
                                                setAnchorEl(event.currentTarget);
                                            }}>
                                                <MoreHoriz />
                                            </IconButton>
                                        </TableCell>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            sx={{
                                                '& .MuiPaper-root': {
                                                    borderRadius: '8px',
                                                    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.02)',
                                                    padding: '4px',
                                                    minWidth: '100px',
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
                                            <MenuItem onClick={() => {
                                                setOpen(true)
                                                handleMenuClose()
                                            }}>
                                                View Detail
                                            </MenuItem>
                                            <MenuItem>
                                                Staying
                                            </MenuItem>
                                            <MenuItem>
                                                Check Out
                                            </MenuItem>
                                        </Menu>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Pagination
                count={
                    tabSelected === 0
                        ? count.all
                        : tabSelected === 1
                            ? count.pending
                            : tabSelected === 2
                                ? count.checkedIn
                                : count.checkedOut
                }
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2, alignSelf: 'flex-end' }}
                page={currentPage}
                onChange={handlePageChange}
            />

            <BookingDetailModal open={open} onClose={() => setOpen(false)} selectedBooking={selectedBooking} />
        </Box>
    )
}

export default ReceptionistTable
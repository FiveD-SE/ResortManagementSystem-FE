import { ArrowDropDown, CalendarMonth, MeetingRoom } from '@mui/icons-material'
import { Box, Button, Tab, Tabs, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Pagination, FormControl, Select, MenuItem, InputAdornment, Popover } from '@mui/material'
import { Apps, PaidRounded, PendingActionsRounded } from '@mui/icons-material'
import BookingInformationModal from './BookingInformationModal';
import React from 'react';
import dayjs from 'dayjs';
import { MonthCalendar } from '@mui/x-date-pickers';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { SelectChangeEvent } from '@mui/material';
import { DateRange } from 'react-date-range';
import { IBooking, IBookingApiResponse } from '../../../types';
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

const getButtonStyles = (isActive: boolean) => ({
    bgcolor: isActive ? 'primary.500' : 'white.50',
    color: isActive ? 'white.50' : 'black.900',
    textTransform: 'none',
    borderRadius: 2,
    border: '1px solid',
    borderColor: isActive ? 'primary.500' : 'gray.100',
    padding: '8px 24px',
    ":hover": {
        borderColor: isActive ? 'primary.600' : 'gray.500',
        transition: 'ease-in-out 0.3s',
    },
});

interface BookingTableProps {
    pendingBookingData: IBookingApiResponse | undefined;
    checkedInBookingData: IBookingApiResponse | undefined;
    checkedOutBookingData: IBookingApiResponse | undefined;
}

const BookingTable = ({ pendingBookingData, checkedInBookingData, checkedOutBookingData }: BookingTableProps) => {
    const [bookingDate, setBookingDate] = React.useState('monthly');
    const [open, setOpen] = React.useState(false);
    const [openCalendar, setOpenCalendar] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [selectedDateRange, setSelectedDateRange] = React.useState({ startDate: new Date(), endDate: new Date(), key: 'selection' });
    const [selectedMonth, setSelectedMonth] = React.useState(dayjs());
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
            customerId: booking.customerId.id,
            checkInDate: dayjs(booking.checkinDate).format('YYYY/MM/DD'),
            checkOutDate: dayjs(booking.checkoutDate).format('YYYY/MM/DD'),
            totalAmount: booking.totalAmount,
            status: booking.status,
        }));

        const checkedInBookings = checkedInBookingData?.docs.map((booking) => ({
            id: booking.id,
            roomType: booking.roomId.roomTypeId.typeName,
            roomNumber: booking.roomId.roomNumber,
            customerId: booking.customerId.id,
            checkInDate: dayjs(booking.checkinDate).format('YYYY/MM/DD'),
            checkOutDate: dayjs(booking.checkoutDate).format('YYYY/MM/DD'),
            totalAmount: booking.totalAmount,
            status: booking.status,
        }));

        const checkedOutBookings = checkedOutBookingData?.docs.map((booking) => ({
            id: booking.id,
            roomType: booking.roomId.roomTypeId.typeName,
            roomNumber: booking.roomId.roomNumber,
            customerId: booking.customerId.id,
            checkInDate: dayjs(booking.checkinDate).format('YYYY/MM/DD'),
            checkOutDate: dayjs(booking.checkoutDate).format('YYYY/MM/DD'),
            totalAmount: booking.totalAmount,
            status: booking.status,
        }));

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
        const tabFilter = tabSelected === 0
            ? docsInCurrentPage
            : docsInCurrentPage.filter((booking) =>
                tabSelected === 1
                    ? booking.status.toLowerCase() === 'pending'
                    : tabSelected === 2
                        ? booking.status.toLowerCase() === 'checked in'
                        : booking.status.toLowerCase() === 'checked out');

        const dateFilter = tabFilter.filter((row) => {
            const checkInDate = dayjs(row.checkInDate);
            const checkOutDate = dayjs(row.checkOutDate);

            if (bookingDate === 'daily') {
                const startDate = dayjs(selectedDateRange.startDate);
                const endDate = dayjs(selectedDateRange.endDate);

                return (
                    (checkInDate.isBetween(startDate, endDate, 'day', '[]') ||
                        checkOutDate.isBetween(startDate, endDate, 'day', '[]')) ||
                    (checkInDate.isBefore(startDate) && checkOutDate.isAfter(endDate))
                );
            }

            if (bookingDate === 'monthly') {
                const monthStart = selectedMonth.startOf('month');
                const monthEnd = selectedMonth.endOf('month');

                return (
                    (checkInDate.isBetween(monthStart, monthEnd, 'day', '[]') ||
                        checkOutDate.isBetween(monthStart, monthEnd, 'day', '[]')) ||
                    (checkInDate.isBefore(monthStart) && checkOutDate.isAfter(monthEnd))
                );
            }

            return true;
        });

        return dateFilter.filter((row) => {
            if (selectedSearch === 'Room Type') {
                return row.roomType.toLowerCase().includes(search.toLowerCase());
            } else if (selectedSearch === 'Room Number') {
                return row.roomNumber.toString().includes(search);
            } else if (selectedSearch === 'Check In Date') {
                return row.checkInDate.includes(search);
            } else if (selectedSearch === 'Check Out Date') {
                return row.checkOutDate.includes(search);
            } else {
                return row.status.toLowerCase().includes(search.toLowerCase());
            }
        });
    }, [tabSelected, search, bookingDate, selectedDateRange, selectedMonth, selectedSearch, currentPage]);

    const filteredRows = React.useMemo(() => getFilteredRows(), [getFilteredRows]);

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setTabSelected(newValue);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleCalendarOpen = (type: string, event: React.MouseEvent<HTMLElement>) => {
        setBookingDate(type);
        setAnchorEl(event.currentTarget);
        setOpenCalendar(true);
    };

    const handleMonthChange = (newMonth: dayjs.Dayjs) => {
        setSelectedMonth(newMonth);
        setOpenCalendar(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenCalendar(false);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', paddingX: 2, gap: 2 }}>
                <Typography sx={{ color: 'black.900', fontSize: 20, fontWeight: 600 }}>
                    Booking Date
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: 'primary.500', fontSize: 32, fontWeight: 600 }}>
                        {bookingDate === 'daily'
                            ? dayjs(selectedDateRange.startDate).format('DD/MM/YYYY') + ' - ' + dayjs(selectedDateRange.endDate).format('DD/MM/YYYY')
                            : selectedMonth.format('MM/YYYY')}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <Button
                            sx={getButtonStyles(bookingDate === 'daily')}
                            endIcon={<CalendarMonth />}
                            onClick={(event) => handleCalendarOpen('daily', event)}
                        >
                            Daily
                        </Button>
                        <Button
                            sx={getButtonStyles(bookingDate === 'monthly')}
                            endIcon={<CalendarMonth />}
                            onClick={(event) => handleCalendarOpen('monthly', event)}
                        >
                            Monthly
                        </Button>
                    </Box>
                </Box>
            </Box>

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
                                <TableCell>Room Type</TableCell>
                                <TableCell>Room Number</TableCell>
                                <TableCell>Customer ID</TableCell>
                                <TableCell>Check In Date</TableCell>
                                <TableCell>Check Out Date</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No booking found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRows.map((row, index) => (
                                    <TableRow key={index} sx={{ cursor: 'pointer', ":hover": { bgcolor: 'gray.50' }, '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => { setOpen(true); handleSelectBooking(row.id, row.status) }}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.roomType}</TableCell>
                                        <TableCell>{row.roomNumber}</TableCell>
                                        <TableCell>{row.customerId}</TableCell>
                                        <TableCell>{row.checkInDate}</TableCell>
                                        <TableCell>{row.checkOutDate}</TableCell>
                                        <TableCell>{formatPrice(row.totalAmount)}</TableCell>
                                        <TableCell>{row.status}</TableCell>
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

            <BookingInformationModal open={open} onClose={() => setOpen(false)} selectedBooking={selectedBooking} />

            {/* Calendar Popover */}
            <Popover
                open={openCalendar}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: { padding: 2, borderRadius: 2, boxShadow: 16, mt: 2 },
                }}
            >
                {bookingDate === 'daily' ? (
                    <DateRange
                        ranges={[selectedDateRange]}
                        onChange={(ranges) => setSelectedDateRange(ranges.selection)}
                        displayMode="dateRange"
                        editableDateInputs={false}
                        moveRangeOnFirstSelection={false}
                        rangeColors={['#FF385C']}
                    />
                ) : (
                    <MonthCalendar
                        value={selectedMonth}
                        onChange={(newMonth) => handleMonthChange(newMonth)}
                    />
                )}
            </Popover>
        </Box>
    )
}

export default BookingTable
import { ArrowDropDown, CalendarMonth, MoreHoriz, MeetingRoom } from '@mui/icons-material'
import { Box, Button, Tab, Tabs, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Pagination, IconButton, FormControl, Select, MenuItem, InputAdornment, Popover } from '@mui/material'
import { Apps, PaidRounded, PendingActionsRounded } from '@mui/icons-material'
import BookingInformationModal from './BookingInformationModal';
import React from 'react';
import dayjs from 'dayjs';
import { DateCalendar, MonthCalendar } from '@mui/x-date-pickers';
import { SelectChangeEvent } from '@mui/material';

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

interface DataRow {
    id: number;
    roomType: string;
    roomNumber: number;
    customerId: number;
    checkInDate: string;
    checkOutDate: string;
    totalAmount: number;
    status: string;
}

const rows: DataRow[] = [
    { id: 1, roomType: 'Single', roomNumber: 101, customerId: 1, checkInDate: '2021/10/10', checkOutDate: '2021/10/12', totalAmount: 100, status: 'Pending' },
    { id: 2, roomType: 'Double', roomNumber: 102, customerId: 2, checkInDate: '2021/10/10', checkOutDate: '2021/10/12', totalAmount: 200, status: 'Pending' },
    { id: 3, roomType: 'Single', roomNumber: 103, customerId: 3, checkInDate: '2021/10/10', checkOutDate: '2021/10/12', totalAmount: 300, status: 'Pending' }
];

const BookingTable = () => {
    const [bookingDate, setBookingDate] = React.useState('daily');
    const [open, setOpen] = React.useState(false);
    const [openCalendar, setOpenCalendar] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [selectedDate, setSelectedDate] = React.useState(dayjs());
    const [selectedMonth, setSelectedMonth] = React.useState(dayjs());
    const [selectedSearch, setSelectedSearch] = React.useState('Room Type');

    const handleCalendarOpen = (type: string, event: React.MouseEvent<HTMLElement>) => {
        setBookingDate(type);
        setAnchorEl(event.currentTarget);
        setOpenCalendar(true);
    };


    const handleDateChange = (newDate: dayjs.Dayjs) => {
        setSelectedDate(newDate);
        setOpenCalendar(false);
    };

    const handleMonthChange = (newMonth: dayjs.Dayjs) => {
        setSelectedMonth(newMonth);
        setOpenCalendar(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenCalendar(false);
    };

    const handleSearchChange = (event: SelectChangeEvent<string>) => {
        setSelectedSearch(event.target.value);
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
                            ? selectedDate.format('YYYY/MM/DD')
                            : selectedMonth.format('YYYY/MM')}
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
                    value={0}
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
                        label="Paid"
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
                            onChange={handleSearchChange}
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
                    />
                </Box>
            </Box>

            <Box sx={{ height: "85vh", borderRadius: 2, border: "1px solid rgb(222, 222, 222)" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Room Type</TableCell>
                                <TableCell>Room Number</TableCell>
                                <TableCell>Customer ID</TableCell>
                                <TableCell>Check In Date</TableCell>
                                <TableCell>Check Out Date</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.roomType}</TableCell>
                                    <TableCell>{row.roomNumber}</TableCell>
                                    <TableCell>{row.customerId}</TableCell>
                                    <TableCell>{row.checkInDate}</TableCell>
                                    <TableCell>{row.checkOutDate}</TableCell>
                                    <TableCell>{row.totalAmount}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => setOpen(true)}>
                                            <MoreHoriz />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2, alignSelf: 'flex-end' }}
            />

            <BookingInformationModal open={open} onClose={() => setOpen(false)} />

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
                    <DateCalendar
                        value={selectedDate}
                        onChange={(newDate) => handleDateChange(newDate)}
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
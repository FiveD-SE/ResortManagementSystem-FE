import { Box, Typography, IconButton } from '@mui/material'
import { Notifications } from '@mui/icons-material'
import BookingTable from './components/BookingTable'
import { useGetBookingsQuery } from '../../apis/bookingApi'
import BookingTableSkeleton from './components/BookingTableSkeleton'

const BookingManagement = () => {
    const { data: pendingBookingData, isLoading: isLoadingPendingBooking } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'pending' })
    const { data: checkedInBookingData, isLoading: isLoadingCheckedInBooking } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'checked in' })
    const { data: checkedOutBookingData, isLoading: isLoadingCheckedOutBooking } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'checked out' })

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Booking Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                    <Notifications />
                </IconButton>
            </Box>

            {/* Booking Table */}
            {isLoadingPendingBooking || isLoadingCheckedInBooking || isLoadingCheckedOutBooking ? (
                <BookingTableSkeleton />
            ) : (
                <BookingTable
                    pendingBookingData={pendingBookingData}
                    checkedInBookingData={checkedInBookingData}
                    checkedOutBookingData={checkedOutBookingData}
                />
            )}
        </Box>
    )
}

export default BookingManagement
import { Box, Typography, IconButton } from '@mui/material'
import { Notifications } from '@mui/icons-material'
import BookingTable from './components/BookingTable'
import { useGetBookingsQuery } from '../../apis/bookingApi'
import React from 'react'
import BookingTableSkeleton from './components/BookingTableSkeleton'
const BookingManagement = () => {
    const [page, setPage] = React.useState(1)
    const { data: pendingBookingData, isLoading: isLoadingPendingBooking } = useGetBookingsQuery({ page: page, limit: 10, sortBy: 'createdAt', sortOrder: 'desc', filter: 'pending' })
    const { data: checkedInBookingData, isLoading: isLoadingCheckedInBooking } = useGetBookingsQuery({ page: page, limit: 10, sortBy: 'createdAt', sortOrder: 'desc', filter: 'checked in' })
    const { data: checkedOutBookingData, isLoading: isLoadingCheckedOutBooking } = useGetBookingsQuery({ page: page, limit: 10, sortBy: 'createdAt', sortOrder: 'desc', filter: 'checked out' })
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }
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
                    onPageChange={handlePageChange}
                />
            )}
        </Box>
    )
}

export default BookingManagement
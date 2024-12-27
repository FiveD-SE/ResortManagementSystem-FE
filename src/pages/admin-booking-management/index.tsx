import { Box, Typography, IconButton } from '@mui/material'
import { Notifications } from '@mui/icons-material'
import BookingTable from './components/BookingTable'

const BookingManagement = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Booking Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                    <Notifications />
                </IconButton>
            </Box>

            {/* Booking Table */}
            <BookingTable />
        </Box>
    )
}

export default BookingManagement
import { Box, Typography, IconButton } from '@mui/material'
import { Download } from '@mui/icons-material'
import BookingTable from './components/BookingTable'
import { useGetBookingsQuery } from '../../apis/bookingApi'
import BookingTableSkeleton from './components/BookingTableSkeleton'
import { useExportBookingExcelMutation } from '../../apis/exportApi'
import toast from 'react-hot-toast'

const BookingManagement = () => {
    const { data: pendingBookingData, isLoading: isLoadingPendingBooking } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'pending' })
    const { data: checkedInBookingData, isLoading: isLoadingCheckedInBooking } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'checked in' })
    const { data: checkedOutBookingData, isLoading: isLoadingCheckedOutBooking } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'checked out' })

    const [exportExcel] = useExportBookingExcelMutation();

    const handleExportExcel = async () => {
        try {
            const response = await exportExcel();

            if (response && response.data) {
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                if (blob.size === 0) {
                    toast.error('File is empty');
                    return;
                }

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'booking-report.xlsx');
                document.body.appendChild(link);
                link.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);

                toast.success('File exported successfully');
            } else {
                toast.error('Error exporting file');
            }
        } catch (error) {
            console.error('Excel export error:', error);
            toast.error('Error exporting file');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Booking Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }} onClick={handleExportExcel}>
                    <Download />
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
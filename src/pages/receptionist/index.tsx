import { Box } from '@mui/material'
import StatisticBox from './components/StatisticBox'
import ReceptionistTable from './components/ReceptionistTable'
import { useGetBookingsQuery, useGetBookingsStatusCountQuery } from '../../apis/bookingApi'
import StatisticBoxSkeleton from './components/StatisticBoxSkeleton'
import ReceptionistTableSkeleton from './components/ReceptionistTableSkeleton'

const Receptionist = () => {
    const { data: pendingBookingData, isLoading: pendingBookingLoading } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'pending' })
    const { data: checkedInBookingData, isLoading: checkedInBookingLoading } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'checked in' })
    const { data: checkedOutBookingData, isLoading: checkedOutBookingLoading } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'checked out' })

    const { data, isLoading } = useGetBookingsStatusCountQuery()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 4 }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                {isLoading ? (
                    <>
                        <StatisticBoxSkeleton />
                        <StatisticBoxSkeleton />
                        <StatisticBoxSkeleton />
                    </>
                ) : (
                    <>
                        <StatisticBox title='Pending' value={data?.pending ?? 0} />
                        <StatisticBox title='Check-in' value={data?.checkedIn ?? 0} />
                        <StatisticBox title='Check-out' value={data?.checkedOut ?? 0} />
                    </>
                )}
            </Box>

            {pendingBookingLoading || checkedInBookingLoading || checkedOutBookingLoading ? (
                <ReceptionistTableSkeleton />
            ) : (
                <ReceptionistTable
                    pendingBookingData={pendingBookingData}
                    checkedInBookingData={checkedInBookingData}
                    checkedOutBookingData={checkedOutBookingData}
                />
            )}
        </Box>
    )
}

export default Receptionist
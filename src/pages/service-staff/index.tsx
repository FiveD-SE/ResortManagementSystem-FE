import { Box } from '@mui/material'
import StatisticBox from './components/StatisticBox'
import ServiceStaffTable from './components/ServiceStaffTable'
import { useGetBookingServicesCountQuery, useGetBookingServicesQuery } from '../../apis/bookingApi'
import StatisticBoxSkeleton from './components/StatisticBoxSkeleton'
import ServiceStaffTableSkeleton from './components/ServiceStaffTableSkeleton'

const ServiceStaff = () => {
    const { data, isLoading } = useGetBookingServicesCountQuery()
    const { data: pendingServices, isLoading: pendingServicesLoading } = useGetBookingServicesQuery({ page: 1, limit: 100, status: 'Pending' })
    const { data: servedServices, isLoading: servedServicesLoading } = useGetBookingServicesQuery({ page: 1, limit: 100, status: 'Served' })
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 4 }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                {isLoading ? (
                    <>
                        <StatisticBoxSkeleton />
                        <StatisticBoxSkeleton />
                    </>
                ) : (
                    <>
                        <StatisticBox title='Pending' value={data?.pending || 0} />
                        <StatisticBox title='Served' value={data?.served || 0} />
                    </>
                )}
            </Box>

            {pendingServicesLoading || servedServicesLoading ? (
                <ServiceStaffTableSkeleton />
            ) : (
                <ServiceStaffTable
                    pendingServices={pendingServices}
                    servedServices={servedServices}
                />
            )}
        </Box>
    )
}

export default ServiceStaff
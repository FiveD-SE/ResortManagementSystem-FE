import { Notifications } from "@mui/icons-material"
import { Box, IconButton, Skeleton, Typography } from "@mui/material"
import Statistic from "./components/Statistic"
import Revenue from "./components/Revenue"
import RevenueByServiceType from "./components/RevenueByServiceType"
import RevenueByRoomType from "./components/RevenueByRoomType"
import { useGetDailyRevenueQuery, useGetCustomerGrowthQuery, useGetRoomAvailabilityTodayQuery, useGetServiceRevenueQuery, useGetRoomTypeRevenueQuery, useGetYearlyRevenueQuery } from "../../apis/adminDashboardApi"

const AdminDashboard = () => {
    const { data: dailyRevenue, isLoading: DailyRevenueLoading } = useGetDailyRevenueQuery();
    const { data: customerGrowth, isLoading: CustomerRevenueLoading } = useGetCustomerGrowthQuery();
    const { data: roomAvailability, isLoading: RoomAvailabilityLoading } = useGetRoomAvailabilityTodayQuery();
    const { data: serviceRevenue, isLoading: ServiceRevenueLoading } = useGetServiceRevenueQuery();
    const { data: roomTypeRevenue, isLoading: RoomTypeRevenueLoading } = useGetRoomTypeRevenueQuery();
    const { data: yearlyRevenue, isLoading: YearlyRevenueLoading } = useGetYearlyRevenueQuery();
    return (
        <>
            {DailyRevenueLoading || CustomerRevenueLoading || RoomAvailabilityLoading || ServiceRevenueLoading || RoomTypeRevenueLoading || YearlyRevenueLoading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='h4' sx={{ color: 'black.900' }}>Dashboard</Typography>
                        <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                            <Notifications />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Skeleton variant='rounded' width={100} height={20} />
                            <Skeleton variant='rounded' width={200} height={20} />
                        </Box>
                        <Skeleton variant='rounded' width={100} height={30} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                        <Skeleton variant='rounded' width='100%' height={180} />
                        <Skeleton variant='rounded' width='100%' height={180} />
                        <Skeleton variant='rounded' width='100%' height={180} />
                    </Box>

                    <Skeleton variant='rounded' width='100%' height={300} />
                </Box>
            ) : (
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h4' sx={{ color: 'black.900' }}>Dashboard</Typography>
                            <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                                <Notifications />
                            </IconButton>
                        </Box>

                        {/* Statistic Section */}
                        <Statistic
                            dailyRevenue={dailyRevenue}
                            customerGrowth={customerGrowth}
                            roomAvailability={roomAvailability}
                        />

                        {/* Revenue Section */}
                        <Revenue yearlyRevenue={yearlyRevenue} />

                        {/* Revenue By Order */}
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 4 }}>
                            <RevenueByServiceType serviceRevenue={serviceRevenue} />
                            <RevenueByRoomType roomTypeRevenue={roomTypeRevenue} />
                        </Box>
                    </Box>
                </>
            )}
        </>
    )
}

export default AdminDashboard
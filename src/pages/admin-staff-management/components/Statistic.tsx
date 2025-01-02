import { Box } from "@mui/material"
import StatisticBox from "./StatisticBox"
import { useGetStaffStatisticQuery } from "../../../apis/userApi"
import StatisticBoxSkeleton from "./StatisticBoxSkeleton";

const Statistic = () => {
    const { data, isLoading } = useGetStaffStatisticQuery() || {};

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {isLoading ? (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                    <StatisticBoxSkeleton />
                    <StatisticBoxSkeleton />
                    <StatisticBoxSkeleton />
                </Box>
            ) : (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                    <StatisticBox title='TOTAL STAFF' value={data?.total || 0} />
                    <StatisticBox title='RECEPTIONIST' value={data?.receptionist || 0} />
                    <StatisticBox title='SERVICE STAFF' value={data?.service_staff || 0} />
                </Box>
            )}
        </Box>
    )
}

export default Statistic
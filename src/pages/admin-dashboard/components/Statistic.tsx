import { Box } from "@mui/material"
import StatisticBox from "./StatisticBox"

const Statistic = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                <StatisticBox title='Revenue' value={1000} growth={100} />
                <StatisticBox title='Total customers' value={1000} growth={100} />
                <StatisticBox title='Available rooms' value={100} growth={100} />
            </Box>
        </Box>
    )
}

export default Statistic
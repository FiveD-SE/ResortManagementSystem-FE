import { Box } from "@mui/material"
import StatisticBox from "./StatisticBox"

const Statistic = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                <StatisticBox title='Active' value={1000} />
                <StatisticBox title='Inactive' value={1000} />
                <StatisticBox title='Expired' value={100} />
            </Box>
        </Box>
    )
}

export default Statistic
import { Box } from "@mui/material"
import StatisticBox from "./StatisticBox"

const Statistic = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                <StatisticBox title='TOTAL STAFF' value={1000} growth={87} comparation={213} />
                <StatisticBox title='RECEPTIONIST' value={1000} growth={59} comparation={120} />
                <StatisticBox title='SERVICE STAFF' value={100} growth={67} comparation={97} />
            </Box>
        </Box>
    )
}

export default Statistic
import { Box, Typography } from "@mui/material"

interface StatisticBoxProps {
    title: string;
    value: number;
}

const StatisticBox = ({ title, value }: StatisticBoxProps) => {
    const formatValue = (value: number) => {
        return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: 1, borderColor: 'gray.200', borderRadius: 2, padding: 2, gap: 2 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{title}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: 26, fontWeight: 600 }}>{formatValue(value)}</Typography>
            </Box>
        </Box>
    )
}

export default StatisticBox
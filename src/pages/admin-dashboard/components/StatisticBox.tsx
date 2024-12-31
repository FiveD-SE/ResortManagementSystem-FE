import { AnalyticsRounded, Groups2Rounded, HouseRounded } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"

interface StatisticBoxProps {
    title: string;
    value: number;
    growth: number;
    comparison?: string;
}

const StatisticBox = ({ title, value, growth, comparison }: StatisticBoxProps) => {
    const setIcon = () => {
        if (title === 'Revenue') {
            return (
                <Box sx={{ color: 'white.50', bgcolor: 'black.900', borderRadius: 100, width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AnalyticsRounded fontSize='small' />
                </Box>
            )
        }
        if (title === 'Total customers') {
            return (
                <Box sx={{ color: 'white.50', bgcolor: 'black.900', borderRadius: 100, width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Groups2Rounded fontSize='small' />
                </Box>
            )
        }
        if (title === 'Available rooms') {
            return (
                <Box sx={{ color: 'white.50', bgcolor: 'black.900', borderRadius: 100, width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <HouseRounded fontSize='small' />
                </Box>
            )
        }
    }

    const formatValue = (value: number) => {
        return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: 1, borderColor: 'gray.200', borderRadius: 2, padding: 2, gap: '12px' }}>
            {setIcon()}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ fontSize: 28, fontWeight: 600 }}>{title === 'Revenue' && '$'}{formatValue(value)}</Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{title}</Typography>
            </Box>
            {title === 'Available rooms' ? (
                <Typography sx={{ color: 'black.200', fontSize: 12, fontWeight: 400 }}>{comparison} rooms's booking</Typography>
            ) : (
                <Typography sx={{ color: growth < 0 ? 'red.400' : 'green.400', fontSize: 12, fontWeight: 400 }}>{growth?.toFixed(1)}% compared to yesterday</Typography>
            )}
        </Box>
    )
}

export default StatisticBox
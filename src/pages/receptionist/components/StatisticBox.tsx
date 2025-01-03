import { DirectionsCarRounded, FactCheckRounded, DoorSlidingRounded } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"

interface StatisticBoxProps {
    title: string;
    value: number;
}

const StatisticBox = ({ title, value }: StatisticBoxProps) => {
    const setIcon = () => {
        if (title === 'Check-in') {
            return (
                <Box sx={{ color: 'white.50', bgcolor: 'black.900', borderRadius: 100, width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DoorSlidingRounded fontSize='small' />
                </Box>
            )
        }
        if (title === 'Pending') {
            return (
                <Box sx={{ color: 'white.50', bgcolor: 'black.900', borderRadius: 100, width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DirectionsCarRounded fontSize='small' />
                </Box>
            )
        }
        if (title === 'Check-out') {
            return (
                <Box sx={{ color: 'white.50', bgcolor: 'black.900', borderRadius: 100, width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FactCheckRounded fontSize='small' />
                </Box>
            )
        }
    }

    const formatValue = (value: number) => {
        return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: 1, borderColor: 'gray.200', borderRadius: 2, padding: 2, gap: 2 }}>
            {setIcon()}
            <Typography sx={{ fontSize: 28, fontWeight: 600 }}>{formatValue(value)}</Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{title}</Typography>
        </Box>
    )
}

export default StatisticBox
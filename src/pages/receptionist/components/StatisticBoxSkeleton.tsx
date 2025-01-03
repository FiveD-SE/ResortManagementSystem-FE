import { Box, Skeleton } from '@mui/material'

const StatisticBoxSkeleton = () => {
    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: 1, borderColor: 'gray.200', borderRadius: 2, padding: 2, gap: 2 }}>
            <Skeleton variant='circular' width={30} height={30} />
            <Skeleton variant='text' width={100} height={40} />
            <Skeleton variant='text' width={150} height={20} />
        </Box>
    )
}

export default StatisticBoxSkeleton
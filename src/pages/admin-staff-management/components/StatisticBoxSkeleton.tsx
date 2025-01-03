import { Box, Typography, Skeleton } from '@mui/material'

const StatisticBoxSkeleton = () => {
    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                border: 1,
                borderColor: "gray.200",
                borderRadius: 2,
                padding: 2,
                gap: 2,
            }}
        >
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                <Skeleton width={100} />
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                <Skeleton variant="rectangular" width={200} height={32} />
            </Box>
        </Box>
    )
}

export default StatisticBoxSkeleton
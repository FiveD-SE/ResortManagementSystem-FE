import { Box, Skeleton } from "@mui/material";

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
            {/* Icon Placeholder */}
            <Skeleton
                variant="circular"
                width={30}
                height={30}
            />
            {/* Value Placeholder */}
            <Skeleton
                variant="text"
                width={120}
                height={34}
            />
            {/* Title Placeholder */}
            <Skeleton
                variant="text"
                width={90}
                height={22}
            />
        </Box>
    );
};

export default StatisticBoxSkeleton;

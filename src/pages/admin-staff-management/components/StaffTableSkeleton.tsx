import {
    Box,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";


const StaffTableSkeleton = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* Tabs */}
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 2 }} />
                    <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 2 }} />
                </Box>
            </Box>

            {/* Table Skeleton */}
            <Box sx={{ height: "85vh", borderRadius: 2, border: "1px solid rgb(222, 222, 222)", marginTop: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "rgb(222, 222, 222)" }}>
                                <TableCell><Skeleton width={50} /></TableCell>
                                <TableCell><Skeleton width={100} /></TableCell>
                                <TableCell><Skeleton width={100} /></TableCell>
                                <TableCell><Skeleton width={80} /></TableCell>
                                <TableCell><Skeleton width={60} /></TableCell>
                                <TableCell><Skeleton width={40} /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton width={50} /></TableCell>
                                    <TableCell><Skeleton width={100} /></TableCell>
                                    <TableCell><Skeleton width={150} /></TableCell>
                                    <TableCell><Skeleton width={80} /></TableCell>
                                    <TableCell><Skeleton width={60} /></TableCell>
                                    <TableCell><Skeleton variant="circular" width={24} height={24} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Pagination Skeleton */}
            <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
                <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 2 }} />
            </Box>
        </Box>
    );
};

export default StaffTableSkeleton;

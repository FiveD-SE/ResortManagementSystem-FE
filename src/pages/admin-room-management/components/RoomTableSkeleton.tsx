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

const RoomTableSkeleton = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
            {/* Search and Add New Button Skeleton */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 2 }}>
                <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width={160} height={40} sx={{ borderRadius: 2 }} />
            </Box>

            {/* Table Skeleton */}
            <Box sx={{ height: '85vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        {/* Table Header Skeleton */}
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                                {['ID', 'Name', 'Service Type', 'Description', 'Price', ''].map((_header, index) => (
                                    <TableCell key={index}>
                                        <Skeleton variant="text" width="80%" height={20} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Skeleton Rows */}
                            {[...Array(5)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {[...Array(6)].map((_, colIndex) => (
                                        <TableCell key={colIndex}>
                                            <Skeleton
                                                variant="rectangular"
                                                width={colIndex === 5 ? 24 : '90%'}
                                                height={colIndex === 5 ? 24 : 20}
                                                sx={{ borderRadius: colIndex === 5 ? '50%' : 1 }}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Pagination Skeleton */}
            <Skeleton
                variant="rectangular"
                width={160}
                height={40}
                sx={{ marginTop: 2, alignSelf: "flex-end", borderRadius: 2 }}
            />
        </Box>
    );
};

export default RoomTableSkeleton;

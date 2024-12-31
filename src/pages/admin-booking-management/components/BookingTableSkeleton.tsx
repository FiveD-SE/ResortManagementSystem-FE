import {
    Box,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const BookingTableSkeleton = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', paddingX: 2, gap: 2 }}>
                <Typography sx={{ color: 'black.900', fontSize: 20, fontWeight: 600 }}>
                    Booking Date
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: 32, width: '200px', height: '48px' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <Skeleton
                            variant="rectangular"
                            sx={{ width: '120px', height: '40px', borderRadius: 2 }}
                        />
                        <Skeleton
                            variant="rectangular"
                            sx={{ width: '120px', height: '40px', borderRadius: 2 }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Search and Add New Button Skeleton */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                <Skeleton variant="rectangular" width={250} height={40} sx={{ borderRadius: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 2 }} />
                    <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 2 }} />
                </Box>
            </Box>

            {/* Table Skeleton */}
            <Box sx={{ height: '85vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)', overflow: 'hidden', mt: 2 }}>
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

export default BookingTableSkeleton;

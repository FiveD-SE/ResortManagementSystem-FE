import { Box, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const StatisticServiceTypeSkeleton = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Header Skeleton */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Skeleton variant="text" width={150} height={30} />
                <Skeleton variant="rectangular" width={160} height={40} sx={{ borderRadius: 2 }} />
            </Box>

            {/* Statistic Skeleton */}
            <Box sx={{ display: 'flex', flexDirection: 'column', border: '1px solid', borderColor: 'grey.300', borderRadius: 4, padding: 3 }}>
                <Skeleton variant="text" width={100} height={25} />

                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
                    {/* Pie Chart Skeleton */}
                    <Box sx={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Skeleton variant="circular" width={200} height={200} />
                    </Box>

                    {/* Table Skeleton */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 3 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Skeleton variant="text" width="80%" height={20} /></TableCell>
                                        <TableCell><Skeleton variant="text" width="80%" height={20} /></TableCell>
                                        <TableCell><Skeleton variant="text" width="80%" height={20} /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[...Array(4)].map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Skeleton variant="rectangular" width="60%" height={20} />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton variant="rectangular" width="40%" height={20} />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton variant="rectangular" width="30%" height={20} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default StatisticServiceTypeSkeleton;

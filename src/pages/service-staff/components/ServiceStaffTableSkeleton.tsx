import {
    Box,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    InputAdornment,
    TextField,
} from "@mui/material";

const ServiceStaffTableSkeleton = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* Tabs Skeleton */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mt: 4,
                }}
            >
                {/* Search and Filter Skeleton */}
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Skeleton variant="text" width={60} height={32} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ bgcolor: "white", width: 200 }}
                        disabled
                    />
                </Box>
            </Box>

            {/* Table Skeleton */}
            <Box
                sx={{
                    minHeight: "85vh",
                    mt: 2,
                    borderRadius: 2,
                    border: "1px solid rgb(222, 222, 222)",
                    overflow: "hidden",
                }}
            >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "rgb(222, 222, 222)" }}>
                                {["ID", "Customer name", "Room Number", "Room type", "Status", "Total Amount", ""].map(
                                    (_, index) => (
                                        <TableCell key={index}>
                                            <Skeleton variant="text" width="80%" height={20} />
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...Array(5)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {[...Array(7)].map((_, colIndex) => (
                                        <TableCell key={colIndex}>
                                            <Skeleton
                                                variant={
                                                    colIndex === 6 ? "circular" : "rectangular"
                                                }
                                                width={colIndex === 6 ? 24 : "90%"}
                                                height={colIndex === 6 ? 24 : 20}
                                                sx={{
                                                    borderRadius:
                                                        colIndex === 6 ? "50%" : 1,
                                                }}
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
            <Pagination
                count={1}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2, alignSelf: "flex-end" }}
                disabled
            />
        </Box>
    );
};

export default ServiceStaffTableSkeleton;

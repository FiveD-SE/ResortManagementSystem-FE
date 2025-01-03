import { Apps, MotionPhotosOff, FiberManualRecord, NotificationsActive } from "@mui/icons-material";
import { Box, Pagination, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import React, { useState, useCallback } from "react";
import { IUserApiResponse } from "../../../types/user";
import CustomerTableSkeleton from "./CustomerTableSkeleton";

const tabTextStyle = {
    color: "gray.200",
    fontWeight: 600,
    fontSize: "16px",
    textTransform: "none",
    "&.Mui-selected": {
        color: "primary.500",
    },
};

const tabIconStyle = {
    fontSize: "18px",
};

interface CustomerTableProps {
    CustomerData: IUserApiResponse | undefined;
    isLoading: boolean;
    onPageChange?: (_event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomerTable = ({ CustomerData, isLoading, onPageChange }: CustomerTableProps) => {
    const [tabSelected, setTabSelected] = useState<number>(0);
    const [search, setSearch] = useState<string>("");

    const filteredRows = CustomerData?.docs.filter((row) => {
        const matchTab =
            tabSelected === 0 ||
            (tabSelected === 1 && row.isActive) ||
            (tabSelected === 2 && !row.isActive);

        const matchSearch =
            row.firstName.toLowerCase().includes(search.toLowerCase()) ||
            row.lastName.toLowerCase().includes(search.toLowerCase()) ||
            row.email.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    }) || [];

    const handleTabChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
        setTabSelected(newValue);
    }, []);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {/* Tabs */}
                <Tabs
                    aria-label="customer status tabs"
                    TabIndicatorProps={{ style: { backgroundColor: "black.900", bottom: "12px" } }}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: "12px",
                            left: 0,
                            right: 0,
                            height: "1px",
                            backgroundColor: "rgb(222, 222, 222)",
                            zIndex: -1,
                        },
                    }}
                    value={tabSelected}
                    onChange={handleTabChange}
                >
                    <Tab
                        label="All customers"
                        sx={tabTextStyle}
                        icon={<Apps sx={tabIconStyle} />}
                        iconPosition="start"
                        disableRipple
                    />
                    <Tab
                        label="Active"
                        sx={tabTextStyle}
                        icon={<NotificationsActive sx={tabIconStyle} />}
                        iconPosition="start"
                        disableRipple
                    />
                    <Tab
                        label="Inactive"
                        sx={tabTextStyle}
                        icon={<MotionPhotosOff sx={tabIconStyle} />}
                        iconPosition="start"
                        disableRipple
                    />
                </Tabs>

                {/* Search Field */}
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    <TextField
                        id="search"
                        label="Search"
                        variant="outlined"
                        size="small"
                        sx={{
                            bgcolor: "white",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "& fieldset": {
                                    borderColor: "gray.200",
                                },
                                "&:hover fieldset": {
                                    borderColor: "gray.200",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "primary.500",
                                    borderWidth: 1.5,
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "gray.500",
                                "&.Mui-focused": {
                                    color: "primary.500",
                                },
                            },
                        }}
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Box>
            </Box>

            {!isLoading ? (
                <>
                    {/* Table */}
                    < Box sx={{ minHeight: "85vh", borderRadius: 2, border: "1px solid rgb(222, 222, 222)", marginTop: 2 }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRows.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                No customer found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredRows.map((row, index) => (
                                            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{row.firstName} {row.lastName}</TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.phone}</TableCell>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: "black.900",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <FiberManualRecord
                                                            sx={{
                                                                color: row.isActive ? "green.500" : "gray.200",
                                                                height: 15,
                                                                width: 15,
                                                            }}
                                                        />
                                                        {row.isActive ? "Active" : "Inactive"}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {/* Pagination */}
                    <Pagination
                        count={CustomerData?.totalPages ?? 0}
                        variant="outlined"
                        shape="rounded"
                        sx={{ marginTop: 2, alignSelf: "flex-end" }}
                        onChange={onPageChange}
                    />
                </>
            ) : (
                <CustomerTableSkeleton />
            )}
        </Box >
    );
};

export default CustomerTable;

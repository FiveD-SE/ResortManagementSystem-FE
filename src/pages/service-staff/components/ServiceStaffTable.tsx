import React from "react";
import {
    Box,
    IconButton,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tabs,
    Tab,
    Tooltip,
} from "@mui/material";
import {
    Apps,
    MoreTimeRounded,
    Diversity1Rounded,
    CheckCircleRounded
} from "@mui/icons-material";
import { IBookingServicesApiResponse } from "../../../types/booking";
import { IBookingService } from "../../../types/service";
import { useForwardBookingServiceStatusMutation } from "../../../apis/bookingApi";
import toast from "react-hot-toast";

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

interface ServiceStaffTableProps {
    pendingServices: IBookingServicesApiResponse | undefined;
    servedServices: IBookingServicesApiResponse | undefined;
}

const ServiceStaffTable = ({ pendingServices, servedServices }: ServiceStaffTableProps) => {
    const [tabSelected, setTabSelected] = React.useState<number>(0);
    const [search, setSearch] = React.useState<string>("");
    const [page, setPage] = React.useState<number>(1);
    const itemsPerPage = 10;
    const [forwardBookingServiceStatusMutation, { isLoading }] = useForwardBookingServiceStatusMutation();

    const handleTabChange = (_event: React.ChangeEvent<unknown>, newValue: number) => {
        setTabSelected(newValue);
        setPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const getFilteredData = () => {
        let data: IBookingService[] = [];
        if (tabSelected === 0) {
            data = [
                ...(pendingServices?.docs || []),
                ...(servedServices?.docs || []),
            ];
        } else if (tabSelected === 1) {
            data = pendingServices?.docs || [];
        } else if (tabSelected === 2) {
            data = servedServices?.docs || [];
        }

        if (search) {
            data = data.filter(
                (item) =>
                    item.serviceName.toLowerCase().includes(search.toLowerCase()) ||
                    item.roomNumber.includes(search)
            );
        }

        return data;
    };

    const filteredData = getFilteredData();
    const paginatedData = filteredData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleForwardBookingServiceStatus = async (row: IBookingService) => {
        if (!row) return;

        const response = await forwardBookingServiceStatusMutation(row.id);
        if (!response.data) {
            toast.error("Failed to update service status.");
            return;
        }
        toast.success("Service status updated successfully.");
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {/* Custom Tabs */}
                <Tabs
                    value={tabSelected}
                    onChange={handleTabChange}
                    aria-label="custom tabs example"
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
                            backgroundColor: "gray.200",
                            zIndex: -1,
                        },
                    }}
                >
                    <Tab label="All" sx={tabTextStyle} icon={<Apps sx={tabIconStyle} />} iconPosition="start" disableRipple />
                    <Tab label="Pending" sx={tabTextStyle} icon={<MoreTimeRounded sx={tabIconStyle} />} iconPosition="start" disableRipple />
                    <Tab label="Served" sx={tabTextStyle} icon={<Diversity1Rounded sx={tabIconStyle} />} iconPosition="start" disableRipple />
                </Tabs>

                {/* Search and Button */}
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    {/* Search */}
                    <TextField
                        id="search"
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={handleSearchChange}
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
                    />
                </Box>
            </Box>

            {/* Table */}
            <Box sx={{ minHeight: "85vh", borderRadius: 2, border: "1px solid rgb(222, 222, 222)" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Service name</TableCell>
                                <TableCell>Room number</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Total amount</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        {search ? `No results found for "${search}".` : "No services available."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1 + (page - 1) * itemsPerPage}</TableCell>
                                        <TableCell>{row.serviceName}</TableCell>
                                        <TableCell>{row.roomNumber}</TableCell>
                                        <TableCell>{new Date(row.checkinDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{row.price * row.quantity}</TableCell>
                                        <TableCell>
                                            {row.status === "Pending" ? (
                                                <Tooltip
                                                    title={!isLoading ? "Mark as served" : "Waiting for response"}
                                                    arrow
                                                    placement="top"
                                                >
                                                    <IconButton sx={{ padding: 0, margin: 0, color: 'black.900' }} onClick={() => handleForwardBookingServiceStatus(row)}>
                                                        <Diversity1Rounded />
                                                    </IconButton>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip
                                                    title="Done"
                                                    arrow
                                                    placement="top"
                                                >
                                                    <CheckCircleRounded sx={{ color: 'black.900' }} />
                                                </Tooltip>
                                            )}
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
                count={Math.ceil(filteredData.length / itemsPerPage)}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={handlePageChange}
                sx={{ marginTop: 2, alignSelf: "flex-end" }}
            />
        </Box>
    );
};

export default ServiceStaffTable;

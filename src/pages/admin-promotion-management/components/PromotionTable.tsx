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
    Button,
} from "@mui/material";
import {
    MoreHoriz,
    Apps,
    CheckCircle,
    CancelRounded,
    DoDisturbOffRounded,
    Add,
} from "@mui/icons-material";
import AddPromotionModal from "./AddPromotionModal";
import EditPromotionModal from "./EditPromotionModal";

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

interface DataRow {
    id: number;
    name: string;
    description: string;
    discount: number;
    startDate: string;
    endDate: string;
}

const rows: DataRow[] = [
    { id: 1, name: "Promotion 1", description: "Description 1", discount: 10, startDate: "2024-12-15", endDate: "2024-12-30" },
    { id: 2, name: "Promotion 2", description: "Description 2", discount: 20, startDate: "2024-12-01", endDate: "2024-09-15" },
    { id: 3, name: "Promotion 3", description: "Description 3", discount: 30, startDate: "2025-01-01", endDate: "2024-01-30" },
    { id: 4, name: "Promotion 4", description: "Description 4", discount: 40, startDate: "2024-09-01", endDate: "2024-09-30" },
    { id: 5, name: "Promotion 5", description: "Description 5", discount: 50, startDate: "2024-12-01", endDate: "2024-12-30" },
];

const PromotionTable = () => {
    const [openAddPromotionModal, setOpenAddPromotionModal] = React.useState<boolean>(false);
    const [openEditPromotionModal, setOpenEditPromotionModal] = React.useState<boolean>(false);
    const [tabSelected, setTabSelected] = React.useState<number>(0);
    const [search, setSearch] = React.useState<string>("");

    const filteredRows = rows.filter((row) => {
        const currentDate = new Date();
        const startDate = new Date(row.startDate);
        const endDate = new Date(row.endDate);

        const matchTab =
            tabSelected === 0 ||
            (tabSelected === 1 && startDate < currentDate && endDate > currentDate) ||
            (tabSelected === 2 && startDate > currentDate) ||
            (tabSelected === 3 && endDate < currentDate);

        const matchSearch = row.name.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    });

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setTabSelected(newValue);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

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
                    <Tab label="All promotions" sx={tabTextStyle} icon={<Apps sx={tabIconStyle} />} iconPosition="start" disableRipple />
                    <Tab label="Active" sx={tabTextStyle} icon={<CheckCircle sx={tabIconStyle} />} iconPosition="start" disableRipple />
                    <Tab label="Inactive" sx={tabTextStyle} icon={<CancelRounded sx={tabIconStyle} />} iconPosition="start" disableRipple />
                    <Tab label="Expired" sx={tabTextStyle} icon={<DoDisturbOffRounded sx={tabIconStyle} />} iconPosition="start" disableRipple />
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
                    {/* Add Button */}
                    <Button
                        sx={{
                            bgcolor: "primary.500",
                            color: "white.50",
                            ":hover": { bgcolor: "primary.600" },
                            padding: "8px 16px",
                            textTransform: "none",
                            borderRadius: 2,
                        }}
                        startIcon={<Add />}
                        onClick={() => setOpenAddPromotionModal(true)}
                    >
                        Add New Promotion
                    </Button>
                </Box>
            </Box>

            {/* Table */}
            <Box sx={{ height: "85vh", borderRadius: 2, border: "1px solid rgb(222, 222, 222)" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Discount (%)</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        {search ? `No results found for "${search}".` : "No promotions available."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.discount}</TableCell>
                                        <TableCell>{row.startDate}</TableCell>
                                        <TableCell>{row.endDate}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => setOpenEditPromotionModal(true)}>
                                                <MoreHoriz />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Pagination */}
            <Pagination count={10} variant="outlined" shape="rounded" sx={{ marginTop: 2, alignSelf: "flex-end" }} />

            {/* Modals */}
            <AddPromotionModal open={openAddPromotionModal} onClose={() => setOpenAddPromotionModal(false)} />
            <EditPromotionModal open={openEditPromotionModal} onClose={() => setOpenEditPromotionModal(false)} />
        </Box>
    );
};

export default PromotionTable;

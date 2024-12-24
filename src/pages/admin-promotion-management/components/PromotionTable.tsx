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
    Button
} from "@mui/material";
import { MoreHoriz, Apps, CheckCircle, CancelRounded, DoDisturbOffRounded, Add } from "@mui/icons-material";
import React from "react";
import AddPromotionModal from "./AddPromotionModal";
import EditPromotionModal from "./EditPromotionModal";

const tabTextStyle = {
    color: 'gray.200',
    fontWeight: 600,
    fontSize: '16px',
    textTransform: 'none',
    '&.Mui-selected': {
        color: 'primary.500',
    },
};

const tabIconStyle = {
    fontSize: '18px',
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
    { id: 1, name: "Promotion 1", description: "Description 1", discount: 10, startDate: "2021-09-01", endDate: "2021-09-30" },
    { id: 2, name: "Promotion 2", description: "Description 2", discount: 20, startDate: "2021-09-01", endDate: "2021-09-30" },
    { id: 3, name: "Promotion 3", description: "Description 3", discount: 30, startDate: "2021-09-01", endDate: "2021-09-30" },
    { id: 4, name: "Promotion 4", description: "Description 4", discount: 40, startDate: "2021-09-01", endDate: "2021-09-30" },
    { id: 5, name: "Promotion 5", description: "Description 5", discount: 50, startDate: "2021-09-01", endDate: "2021-09-30" },
];

const PromotionTable = () => {
    const [openAddPromotionModal, setOpenAddPromotionModal] = React.useState(false);
    const [openEditPromotionModal, setOpenEditPromotionModal] = React.useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Custom Tabs */}
                <Tabs
                    aria-label="custom tabs example"
                    TabIndicatorProps={{ style: { backgroundColor: 'black.900', bottom: '12px' } }}
                    sx={{
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: '12px',
                            left: 0,
                            right: 0,
                            height: '1px',
                            backgroundColor: 'gray.200',
                            zIndex: -1,
                        },
                    }}
                    value={0}
                >
                    <Tab
                        label="All rooms"
                        sx={tabTextStyle}
                        icon={<Apps sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Active"
                        sx={tabTextStyle}
                        icon={<CheckCircle sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Inactive"
                        sx={tabTextStyle}
                        icon={<CancelRounded sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Expired"
                        sx={tabTextStyle}
                        icon={<DoDisturbOffRounded sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                </Tabs>

                {/* Search and Button */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    {/* Search */}
                    <TextField
                        id="search"
                        label="Search"
                        variant="outlined"
                        size="small"
                        sx={{
                            bgcolor: 'white',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '& fieldset': {
                                    borderColor: 'gray.200',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'gray.200',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.500',
                                    borderWidth: 1.5,
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'gray.500',
                                '&.Mui-focused': {
                                    color: 'primary.500',
                                },
                            },
                        }}
                    />
                    {/* Button */}
                    <Button
                        sx={{
                            bgcolor: 'primary.500',
                            color: 'white.50',
                            ":hover": { bgcolor: 'primary.600' },
                            padding: '8px 16px',
                            textTransform: 'none',
                            borderRadius: 2,
                        }}
                        startIcon={<Add />}
                        onClick={() => setOpenAddPromotionModal(true)}
                    >
                        Add New Promotion
                    </Button>
                </Box>
            </Box>
            <Box sx={{ height: '85vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
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
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{`${row.discount}%`}</TableCell>
                                    <TableCell>{row.startDate}</TableCell>
                                    <TableCell>{row.endDate}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => setOpenEditPromotionModal(true)}>
                                            <MoreHoriz />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2, alignSelf: "flex-end" }}
            />

            <AddPromotionModal open={openAddPromotionModal} onClose={() => setOpenAddPromotionModal(false)} />
            <EditPromotionModal open={openEditPromotionModal} onClose={() => setOpenEditPromotionModal(false)} />
        </Box>
    );
};

export default PromotionTable;

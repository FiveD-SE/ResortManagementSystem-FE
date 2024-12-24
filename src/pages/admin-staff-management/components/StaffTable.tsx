import { Add, Apps, EmojiPeople, FiberManualRecord, MoreHoriz, SupportAgent } from "@mui/icons-material";
import { Box, Button, IconButton, Pagination, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import AddNewStaffModal from "./AddNewStaffModal";
import EditStaffInformation from "./EditStaffInformation";
import React from "react";

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
    email: string;
    role: string;
    status: string;
}

const rows: DataRow[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'Receptionist',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        role: 'Manager',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Alice',
        email: 'alice@gmail.com',
        role: 'Receptionist',
        status: 'Inactive',
    }
];

const StaffTable = () => {
    const [openAddStaffModal, setOpenAddStaffModal] = React.useState(false);
    const [openEditStaffModal, setOpenEditStaffModal] = React.useState(false);

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
                        label="All staff"
                        sx={tabTextStyle}
                        icon={<Apps sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Receptionists"
                        sx={tabTextStyle}
                        icon={<SupportAgent sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Managers"
                        sx={tabTextStyle}
                        icon={<EmojiPeople sx={tabIconStyle} />}
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
                        onClick={() => setOpenAddStaffModal(true)}
                    >
                        Add New Staff
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
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.role}</TableCell>
                                    <TableCell>
                                        {row.status.toLowerCase() === "active" ? (
                                            <Typography sx={{ color: 'black.900', display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <FiberManualRecord color="success" sx={{ height: 15, width: 15, padding: 0, margin: 0 }} />
                                                {row.status}
                                            </Typography>
                                        ) : (
                                            <Typography sx={{ color: 'black.900', display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <FiberManualRecord sx={{ color: 'gray.200', height: 15, width: 15, padding: 0, margin: 0 }} />
                                                {row.status}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => setOpenEditStaffModal(true)}>
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
                sx={{ marginTop: 2, alignSelf: 'flex-end' }}
            />

            <AddNewStaffModal open={openAddStaffModal} onClose={() => setOpenAddStaffModal(false)} />
            <EditStaffInformation open={openEditStaffModal} onClose={() => setOpenEditStaffModal(false)} />
        </Box>
    );
};

export default StaffTable;

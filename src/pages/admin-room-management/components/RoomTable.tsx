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
    Typography,
    TextField,
    Tabs,
    Tab,
    Button
} from "@mui/material";
import { FiberManualRecord, MoreHoriz, Apps, CheckCircle, NoMeetingRoom, Handyman, Add } from "@mui/icons-material";
import AddNewRoomModal from "./AddNewRoomModal";
import EditRoomModal from "./EditRoomModal";
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
    roomNumber: string;
    roomType: string;
    status: string;
    price: number;
}

const rows: DataRow[] = [
    { id: 1, roomNumber: '101', roomType: 'Single Room', status: 'Active', price: 100 },
    { id: 2, roomNumber: '102', roomType: 'Double Room', status: 'Active', price: 200 },
    { id: 3, roomNumber: '103', roomType: 'Triple Room', status: 'Inactive', price: 300 },
    { id: 4, roomNumber: '104', roomType: 'Quad Room', status: 'Active', price: 400 },
    { id: 5, roomNumber: '105', roomType: 'Queen Room', status: 'Inactive', price: 500 },
    { id: 6, roomNumber: '106', roomType: 'King Room', status: 'Active', price: 600 },
];

const RoomTable = () => {
    const [openAddNewRoomModal, setOpenAddNewRoomModal] = React.useState(false);
    const [openEditRoomModal, setOpenEditRoomModal] = React.useState(false);

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
                        label="Available"
                        sx={tabTextStyle}
                        icon={<CheckCircle sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Occupied"
                        sx={tabTextStyle}
                        icon={<NoMeetingRoom sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Under Maintenance"
                        sx={tabTextStyle}
                        icon={<Handyman sx={tabIconStyle} />}
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
                        onClick={() => setOpenAddNewRoomModal(true)}
                    >
                        Add New Room
                    </Button>
                </Box>
            </Box>
            <Box sx={{ height: '85vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Room Number</TableCell>
                                <TableCell>Room Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Price/Night</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.roomNumber}</TableCell>
                                    <TableCell>{row.roomType}</TableCell>
                                    <TableCell>
                                        {row.status.toLowerCase() === "active" ? (
                                            <Typography
                                                sx={{
                                                    color: "black.900",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <FiberManualRecord
                                                    color="success"
                                                    sx={{ height: 15, width: 15, padding: 0, margin: 0 }}
                                                />
                                                {row.status}
                                            </Typography>
                                        ) : (
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
                                                        color: "gray.200",
                                                        height: 15,
                                                        width: 15,
                                                        padding: 0,
                                                        margin: 0,
                                                    }}
                                                />
                                                {row.status}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>{`$${row.price}`}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => setOpenEditRoomModal(true)}>
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

            <AddNewRoomModal open={openAddNewRoomModal} onClose={() => setOpenAddNewRoomModal(false)} />
            <EditRoomModal open={openEditRoomModal} onClose={() => setOpenEditRoomModal(false)} />
        </Box>
    );
};

export default RoomTable;

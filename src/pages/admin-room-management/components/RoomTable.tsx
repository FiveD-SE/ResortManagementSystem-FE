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
import { IRoomApiResponse, IRoomTypeApiResponse } from '../../../types/room';

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

interface RoomTableProps {
    roomsData: IRoomApiResponse | undefined;
    roomTypesData: IRoomTypeApiResponse | undefined;
}


const RoomTable = ({ roomsData, roomTypesData }: RoomTableProps) => {
    const [openAddNewRoomModal, setOpenAddNewRoomModal] = React.useState(false);
    const [openEditRoomModal, setOpenEditRoomModal] = React.useState(false);
    const [tabSelected, setTabSelected] = React.useState<number>(0);
    const [search, setSearch] = React.useState<string>('');

    const getRoomTypeName = (roomTypeId: string): string => {
        const roomType = roomTypesData?.docs.find((type) => type.id === roomTypeId);
        return roomType ? roomType.typeName : 'Unknown';
    };

    const getFilteredRows = React.useCallback(() => {
        const tabFilter = tabSelected === 0
            ? roomsData?.docs
            : roomsData?.docs.filter((room) =>
                tabSelected === 1 ? room.status.toLowerCase() === "available"
                    : tabSelected === 2 ? room.status.toLowerCase() === "occupied"
                        : room.status.toLowerCase() === "under maintenance"
            );

        if (!tabFilter) return [];

        return tabFilter.filter((room) => {
            const searchLower = search.toLowerCase();
            const roomTypeName = getRoomTypeName(room.roomTypeId).toLowerCase();
            return (
                room.roomNumber.toLowerCase().includes(searchLower) ||
                roomTypeName.toLowerCase().includes(searchLower) ||
                room.pricePerNight.toString().includes(searchLower)
            );
        });
    }, [roomsData, tabSelected, search]);


    const filteredRows = React.useMemo(() => getFilteredRows(), [getFilteredRows]);

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setTabSelected(newValue);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

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
                    value={tabSelected}
                    onChange={handleTabChange}
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
                        value={search}
                        onChange={handleSearchChange}
                    />
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
                            <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Room Number</TableCell>
                                <TableCell>Room Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Price/Night</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No room found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRows.map((room, index) =>
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{room.roomNumber}</TableCell>
                                        <TableCell>{getRoomTypeName(room.roomTypeId)}</TableCell>
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
                                                        color:
                                                            room.status.toLowerCase() === "available"
                                                                ? "success"
                                                                : "gray.200",
                                                        height: 15,
                                                        width: 15,
                                                    }}
                                                />
                                                {room.status}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{`$${room.pricePerNight}`}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => setOpenEditRoomModal(true)}>
                                                <MoreHoriz />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
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

import { Add, ArrowBackIosNewRounded, MoreHoriz } from '@mui/icons-material'
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Pagination, TextField } from '@mui/material'
import { AddNewRoomTypeModal } from './AddNewRoomTypeModal';
import { EditRoomTypeModal } from './EditRoomTypeModal';
import React from 'react';

interface RoomTypeManagementProps {
    onManageRoomType: () => void;
}

interface DataRow {
    id: number;
    name: string;
    description: string;
    price: number;
}

const rows: DataRow[] = [
    { id: 1, name: 'Single Room', description: '1 bed', price: 100 },
    { id: 2, name: 'Double Room', description: '2 beds', price: 200 },
    { id: 3, name: 'Triple Room', description: '3 beds', price: 300 },
    { id: 4, name: 'Quad Room', description: '4 beds', price: 400 },
    { id: 5, name: 'Queen Room', description: '5 beds', price: 500 },
    { id: 6, name: 'King Room', description: '6 beds', price: 600 },
]

const RoomTypeManagement = ({ onManageRoomType }: RoomTypeManagementProps) => {
    const [openAddNewRoomType, setOpenAddNewRoomType] = React.useState(false);
    const [openEditRoomType, setOpenEditRoomType] = React.useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
                disableTouchRipple
                sx={{
                    textTransform: 'none',
                    fontSize: 16,
                    fontWeight: 500,
                    color: 'black.200',
                    bgcolor: 'white.50',
                    justifyContent: 'flex-start',
                    padding: 0,
                }}
                startIcon={<ArrowBackIosNewRounded sx={{ width: 20, height: 20 }} />}
                onClick={onManageRoomType}
            >
                Back
            </Button>
            <Typography sx={{ color: 'black.900', fontSize: 20, fontWeight: 600 }}>
                Room Type
            </Typography>

            {/* Search and Button */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 2 }}>
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
                    onClick={() => setOpenAddNewRoomType(true)}
                >
                    Add New Room Type
                </Button>
            </Box>

            <Box sx={{ height: '85vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{`$${row.price}`}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => setOpenEditRoomType(true)}>
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

            <AddNewRoomTypeModal open={openAddNewRoomType} onClose={() => setOpenAddNewRoomType(false)} />
            <EditRoomTypeModal open={openEditRoomType} onClose={() => setOpenEditRoomType(false)} />
        </Box>
    )
}

export default RoomTypeManagement
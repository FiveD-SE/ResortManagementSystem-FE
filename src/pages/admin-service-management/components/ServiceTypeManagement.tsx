import { Add, ArrowBackIosNewRounded, MoreHoriz } from '@mui/icons-material'
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Pagination, TextField } from '@mui/material'
import React from 'react';
import { AddNewServiceTypeModal } from './AddNewServiceTypeModal';
import { EditServiceTypeModal } from './EditServiceTypeModal';

interface ServiceTypeManagementProps {
    onManageServiceType: () => void;
}

interface DataRow {
    id: number;
    name: string;
    description: string;
    price: number;
}

const rows: DataRow[] = [
    { id: 1, name: 'Service 1', description: 'description service 1', price: 100 },
    { id: 2, name: 'Service 2', description: 'description service 2', price: 200 },
    { id: 3, name: 'Service 3', description: 'description service 3', price: 300 },
    { id: 4, name: 'Service 4', description: 'description service 4', price: 400 },
    { id: 5, name: 'Service 5', description: 'description service 5', price: 500 },
    { id: 6, name: 'Service 6', description: 'description service 6', price: 600 },
]

const ServiceTypeManagement = ({ onManageServiceType }: ServiceTypeManagementProps) => {
    const [openAddNewServiceType, setOpenAddNewServiceType] = React.useState(false);
    const [openEditServiceType, setOpenEditServiceType] = React.useState(false);

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
                onClick={onManageServiceType}
            >
                Back
            </Button>
            <Typography sx={{ color: 'black.900', fontSize: 20, fontWeight: 600 }}>
                Service Type
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
                    onClick={() => setOpenAddNewServiceType(true)}
                >
                    Add New Service Type
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
                                        <IconButton onClick={() => setOpenEditServiceType(true)}>
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

            <AddNewServiceTypeModal open={openAddNewServiceType} onClose={() => setOpenAddNewServiceType(false)} />
            <EditServiceTypeModal open={openEditServiceType} onClose={() => setOpenEditServiceType(false)} />
        </Box>
    )
}

export default ServiceTypeManagement
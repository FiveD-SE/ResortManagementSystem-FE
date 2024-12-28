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
    Button
} from "@mui/material";
import { Add, MoreHoriz } from "@mui/icons-material";
import AddNewServiceModal from "./AddNewServiceModal";
import EditServiceModal from "./EditServiceModal";
import React from "react";

interface DataRow {
    id: number;
    name: string;
    serviceType: string;
    description: string;
    price: number;
}

const rows: DataRow[] = [
    { id: 1, name: "Service 1", serviceType: "Type 1", description: "Description 1", price: 100 },
    { id: 2, name: "Service 2", serviceType: "Type 2", description: "Description 2", price: 200 },
    { id: 3, name: "Service 3", serviceType: "Type 3", description: "Description 3", price: 300 },
    { id: 4, name: "Service 4", serviceType: "Type 4", description: "Description 4", price: 400 },
    { id: 5, name: "Service 5", serviceType: "Type 5", description: "Description 5", price: 500 },
];

const ServiceTable = () => {
    const [openAddNewServiceModal, setOpenAddNewServiceModal] = React.useState(false);
    const [openEditServiceModal, setOpenEditServiceModal] = React.useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 2 }}>
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
                    onClick={() => setOpenAddNewServiceModal(true)}
                >
                    Add New Service
                </Button>
            </Box>
            <Box sx={{ height: '85vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Service Type</TableCell>
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
                                    <TableCell>{row.serviceType}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{`$${row.price}`}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => setOpenEditServiceModal(true)}>
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

            <AddNewServiceModal open={openAddNewServiceModal} onClose={() => setOpenAddNewServiceModal(false)} />
            <EditServiceModal open={openEditServiceModal} onClose={() => setOpenEditServiceModal(false)} />
        </Box>
    );
};

export default ServiceTable;

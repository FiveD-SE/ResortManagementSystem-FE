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
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import { Add, MoreHoriz } from "@mui/icons-material";
import AddNewServiceModal from "./AddNewServiceModal";
import EditServiceModal from "./EditServiceModal";
import React from "react";
import { IService, IServiceApiResponse, IServiceTypeApiResponse } from "../../../types";
import PopupModal from "../../../components/PopupModal";
import { useDeleteServiceMutation } from "../../../apis/serviceApi";
import toast from "react-hot-toast";

interface ServiceTableProps {
    serviceData: IServiceApiResponse | undefined;
    serviceTypeData: IServiceTypeApiResponse | undefined;
    onPageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const ServiceTable = ({ serviceData, serviceTypeData, onPageChange }: ServiceTableProps) => {
    const [openAddNewServiceModal, setOpenAddNewServiceModal] = React.useState(false);
    const [openEditServiceModal, setOpenEditServiceModal] = React.useState(false);
    const [search, setSearch] = React.useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
    const [selectedService, setSelectedService] = React.useState<IService>();

    const [deleteService, { isLoading }] = useDeleteServiceMutation();

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const getServiceTypeName = (serviceTypeId: string): string => {
        const serviceType = serviceTypeData?.docs.find((type) => type.id === serviceTypeId);
        return serviceType ? serviceType.typeName : 'Unknown';
    };

    const getFilteredRows = React.useCallback(() => {
        return serviceData?.docs.filter((service) => {
            const searchLower = search.toLowerCase();
            const serviceTypeName = getServiceTypeName(service.serviceTypeId).toLowerCase();
            return (
                service.serviceName.toLowerCase().includes(searchLower) ||
                serviceTypeName.toLowerCase().includes(searchLower) ||
                service.price.toString().includes(searchLower)
            );
        });
    }, [serviceData, search]);

    const filteredRows = React.useMemo(() => getFilteredRows(), [getFilteredRows]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleDeleteService = async () => {
        if (!selectedService) return;
        try {
            await deleteService(selectedService.id);
            toast.success('Service deleted successfully');
        } catch (error) {
            toast.error('Failed to delete service');
        } finally {
            setOpenDeleteModal(false);
        }
    };

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
                    value={search}
                    onChange={handleSearchChange}
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
                            {filteredRows?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No service found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRows?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.serviceName}</TableCell>
                                        <TableCell>{getServiceTypeName(row.serviceTypeId)}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{`$${row.price}`}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={(event) => {
                                                setAnchorEl(event.currentTarget);
                                                setSelectedService(row);
                                            }}>
                                                <MoreHoriz />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{
                                    '& .MuiPaper-root': {
                                        borderRadius: '8px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                        padding: '4px',
                                        minWidth: '100px',
                                    },
                                    '& .MuiMenuItem-root': {
                                        padding: '4px 16px',
                                        borderRadius: '4px',
                                        '&:hover': {
                                            backgroundColor: 'gray.50',
                                        },
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        color: 'black.300',
                                    },
                                }}
                            >
                                <MenuItem onClick={() => {
                                    setOpenEditServiceModal(true);
                                    handleMenuClose();
                                }}>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    setOpenDeleteModal(true);
                                    handleMenuClose();
                                }}>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Pagination
                count={serviceData?.totalPages}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2, alignSelf: "flex-end" }}
                onChange={onPageChange}
            />

            <AddNewServiceModal open={openAddNewServiceModal} onClose={() => setOpenAddNewServiceModal(false)} serviceTypeData={serviceTypeData} />
            <EditServiceModal open={openEditServiceModal} onClose={() => setOpenEditServiceModal(false)} selectedService={selectedService} serviceTypeData={serviceTypeData} />

            <PopupModal
                type='delete'
                open={openDeleteModal}
                title='Delete Service'
                message='Are you sure you want to delete this service?'
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleDeleteService}
                isLoading={isLoading}
            />
        </Box>
    );
};

export default ServiceTable;

import { Add, ArrowBackIosNewRounded, MoreHoriz } from '@mui/icons-material'
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Pagination, TextField, Menu, MenuItem } from '@mui/material'
import React from 'react';
import { AddNewServiceTypeModal } from './AddNewServiceTypeModal';
import { EditServiceTypeModal } from './EditServiceTypeModal';
import { IRoomTypeApiResponse, IServiceApiResponse, IServiceType, IServiceTypeApiResponse } from '../../../types';
import PopupModal from '../../../components/PopupModal';
import { useDeleteServiceTypeMutation } from '../../../apis/serviceTypeApi';
import toast from 'react-hot-toast';

interface ServiceTypeManagementProps {
    onManageServiceType: () => void;
    serviceData: IServiceApiResponse | undefined;
    serviceTypeData: IServiceTypeApiResponse | undefined;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    roomTypesData: IRoomTypeApiResponse | undefined;
    onRefetch: () => void;
}

const ServiceTypeManagement = ({ serviceTypeData, onManageServiceType, onPageChange, roomTypesData, onRefetch }: ServiceTypeManagementProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [openAddNewServiceType, setOpenAddNewServiceType] = React.useState(false);
    const [openEditServiceType, setOpenEditServiceType] = React.useState(false);
    const [selectedServiceType, setSelectedServiceType] = React.useState<IServiceType>();
    const [searchServiceType, setSearchServiceType] = React.useState<string>('');
    const [openDeleteServiceTypeModal, setOpenDeleteServiceTypeModal] = React.useState(false);

    const [deleteServiceType, { isLoading: deleServiceTypeLoading }] = useDeleteServiceTypeMutation();

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: unknown) => {
        setAnchorEl(event.currentTarget);
        setSelectedServiceType(row as IServiceType);
    }


    const filterServiceTypes = React.useMemo(() => {
        if (!serviceTypeData?.docs) return [];
        const searchLower = searchServiceType.toLowerCase();
        return serviceTypeData.docs.filter(
            (row) =>
                row.typeName.toLowerCase().includes(searchLower) ||
                (row.description?.toLowerCase().includes(searchLower) || '')
        );
    }, [serviceTypeData, searchServiceType]);

    const handleDeleteServiceType = async () => {
        if (!selectedServiceType) return;
        try {
            await deleteServiceType(selectedServiceType.id).unwrap();
            toast.success('Service type deleted successfully');
            setOpenDeleteServiceTypeModal(false);
            onRefetch();
        } catch {
            toast.error('Failed to delete service type');
        }
    }

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
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 2 }}>
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
                        width: '40%',
                    }}
                    value={searchServiceType}
                    onChange={(e) => setSearchServiceType(e.target.value)}
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

            <Box sx={{ minHeight: '85vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterServiceTypes.map((row, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{row.typeName}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={(event) => handleMenuOpen(event, row)}>
                                            <MoreHoriz />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
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
                                    setOpenEditServiceType(true);
                                    handleMenuClose();
                                }}>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    setOpenDeleteServiceTypeModal(true);
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
                count={serviceTypeData?.totalPages}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2, alignSelf: "flex-end" }}
                onChange={onPageChange}
            />

            <AddNewServiceTypeModal open={openAddNewServiceType} onClose={() => setOpenAddNewServiceType(false)} roomTypesData={roomTypesData} onRefetch={onRefetch} />
            <EditServiceTypeModal open={openEditServiceType} onClose={() => setOpenEditServiceType(false)} selectedServiceType={selectedServiceType} roomTypesData={roomTypesData} onRefetch={onRefetch} />

            <PopupModal
                type='delete'
                open={openDeleteServiceTypeModal}
                onClose={() => setOpenDeleteServiceTypeModal(false)}
                title='Delete Service Type'
                message='Are you sure you want to delete this service type?'
                onConfirm={handleDeleteServiceType}
                isLoading={deleServiceTypeLoading}
            />
        </Box>
    )
}

export default ServiceTypeManagement

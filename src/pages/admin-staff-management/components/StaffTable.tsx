import { Add, Apps, EmojiPeople, FiberManualRecord, MoreHoriz, SupportAgent } from "@mui/icons-material";
import { Box, Button, IconButton, Pagination, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography, Menu, MenuItem } from "@mui/material";
import AddNewStaffModal from "./AddNewStaffModal";
import EditStaffInformation from "./EditStaffInformation";
import React from "react";
import { IUserApiResponse } from "../../../types/user";
import PopupModal from "../../../components/PopupModal";
import { useGetServiceTypesQuery } from "../../../apis/serviceTypeApi";
import { useDeleteUserMutation } from "../../../apis/userApi";
import toast from "react-hot-toast";

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

interface StaffTableProps {
    ReceptionistData: IUserApiResponse | undefined;
    ServiceStaffData: IUserApiResponse | undefined;
    onChangePage?: (_event: React.ChangeEvent<unknown>, value: number) => void;
}

const StaffTable = ({ ReceptionistData, ServiceStaffData, onChangePage }: StaffTableProps) => {
    const [openAddStaffModal, setOpenAddStaffModal] = React.useState<boolean>(false);
    const [openEditStaffModal, setOpenEditStaffModal] = React.useState<boolean>(false);
    const [tabSelected, setTabSelected] = React.useState<number>(0);
    const [search, setSearch] = React.useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedStaffId, setSelectedStaffId] = React.useState<string>('');
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
    const [totalPage, setTotalPage] = React.useState<number>(0);

    React.useEffect(() => {
        if (tabSelected === 0) {
            if ((ReceptionistData?.docs?.length ?? 0) + (ServiceStaffData?.docs?.length ?? 0) > 10) {
                setTotalPage((ReceptionistData?.totalPages ?? 0) + (ServiceStaffData?.totalPages ?? 0));
            } else {
                setTotalPage(1);
            }
        } else if (tabSelected === 1) {
            setTotalPage(ReceptionistData?.totalPages ?? 0);
        } else {
            setTotalPage(ServiceStaffData?.totalPages ?? 0);
        }
    }, [tabSelected]);

    const [deleteUser, { isLoading }] = useDeleteUserMutation();

    const { data: serviceTypeData } = useGetServiceTypesQuery({ page: 1, limit: 20, sort: 'asc' });

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedStaffId(id);
    }

    const combinedRows = React.useMemo(() => {
        const receptionistRows = ReceptionistData?.docs.map((doc) => ({
            id: doc.id,
            name: `${doc.firstName} ${doc.lastName}`,
            email: doc.email,
            role: 'Receptionist',
            status: doc.isActive ? 'Active' : 'Inactive',
        })) || [];

        const serviceStaffRows = ServiceStaffData?.docs.map((doc) => ({
            id: doc.id,
            name: `${doc.firstName} ${doc.lastName}`,
            email: doc.email,
            role: 'Service Staff',
            status: doc.isActive ? 'Active' : 'Inactive',
            serviceTypeId: doc.serviceTypeId,
        })) || [];

        return [...receptionistRows, ...serviceStaffRows];
    }, [ReceptionistData, ServiceStaffData]);

    const getFilteredRows = React.useCallback(() => {
        const tabFilter = tabSelected === 0
            ? combinedRows
            : combinedRows.filter((row) =>
                tabSelected === 1 ? row.role.toLowerCase() === "receptionist"
                    : row.role.toLowerCase() === "service staff"
            );

        return tabFilter.filter((row) =>
            row.name.toLowerCase().includes(search.toLowerCase()) ||
            row.email.toLowerCase().includes(search.toLowerCase()) ||
            row.status.toLowerCase().includes(search.toLowerCase())
        );
    }, [combinedRows, tabSelected, search]);

    const filteredRows = React.useMemo(() => getFilteredRows(), [getFilteredRows]);

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setTabSelected(newValue);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(selectedStaffId);
            toast.success('Staff deleted successfully');
            setOpenDeleteModal(false);
        } catch (error) {
            toast.error('Failed to delete staff');
        }
    }

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
                        label="All staff"
                        sx={tabTextStyle}
                        icon={<Apps sx={tabIconStyle} />}
                        iconPosition="start"
                        disableRipple
                    />
                    <Tab
                        label="Receptionists"
                        sx={tabTextStyle}
                        icon={<SupportAgent sx={tabIconStyle} />}
                        iconPosition="start"
                        disableRipple
                    />
                    <Tab
                        label="Service Staff"
                        sx={tabTextStyle}
                        icon={<EmojiPeople sx={tabIconStyle} />}
                        iconPosition="start"
                        disableRipple
                    />
                </Tabs>

                {/* Search and Add Button */}
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
                        value={search}
                        onChange={handleSearchChange}
                    />
                    {/* Add Staff Button */}
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

            <Box sx={{ minHeight: '85vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)', marginTop: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No staff found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRows.map((row, index) => (
                                    <TableRow key={index} sx={{ '&last-child td, &last-child th': { border: 0 } }}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.role}</TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    color: 'black.900',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                }}
                                            >
                                                <FiberManualRecord
                                                    color={row.status.toLowerCase() === "active" ? "success" : "disabled"}
                                                    sx={{ height: 15, width: 15 }}
                                                />
                                                {row.status}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
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
                                    setOpenEditStaffModal(true);
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
                count={totalPage}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2, alignSelf: 'flex-end' }}
                onChange={onChangePage}
            />

            <AddNewStaffModal open={openAddStaffModal} onClose={() => setOpenAddStaffModal(false)} serviceTypeData={serviceTypeData} />
            <EditStaffInformation open={openEditStaffModal} onClose={() => setOpenEditStaffModal(false)} serviceTypeData={serviceTypeData} selectedStaffId={selectedStaffId} />

            <PopupModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                title="Delete Staff"
                message="Are you sure you want to delete this staff?"
                type="delete"
                onConfirm={handleDeleteUser}
                isLoading={isLoading}
            />
        </Box>
    );
};


export default StaffTable;

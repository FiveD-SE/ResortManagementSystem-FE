import { Close } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import CustomInputForm from "../../../components/CustomInputForm";
import CustomSelectingForm from "../../../components/CustomSelectingForm";
import { IServiceTypeApiResponse, Role } from "../../../types";
import { useCreateUserMutation } from "../../../apis/userApi";
import toast from "react-hot-toast";

interface AddNewStaffModalProps {
    open: boolean;
    onClose: () => void;
    serviceTypeData: IServiceTypeApiResponse | undefined;
    onRefresh: () => void;
}

const Roles = ['Receptionist', 'Service Staff'];

const AddNewStaffModal = ({ open, onClose, serviceTypeData, onRefresh }: AddNewStaffModalProps) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('');
    const [serviceType, setServiceType] = React.useState('');

    const [createUser, { isLoading }] = useCreateUserMutation();

    const ServiceTypes = serviceTypeData?.docs.map((serviceType) => serviceType.typeName) || [];

    const validateForm = () => {
        if (!name) {
            toast.error('Name is required');
            return false;
        }
        if (!email) {
            toast.error('Email is required');
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error('Invalid email address');
            return false;
        }
        if (!role) {
            toast.error('Role is required');
            return false;
        }
        if (role === 'Service Staff' && !serviceType) {
            toast.error('Service type is required for Service Staff');
            return false;
        }
        return true;
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setRole('');
        setServiceType('');
    };

    const handleCreateUser = async () => {
        if (!validateForm()) return;
        const serviceTypeId = serviceTypeData?.docs.find((service) => service.typeName === serviceType)?.id;

        if (role === 'Service Staff' && !serviceTypeId) {
            toast.error('Service type is invalid');
            return;
        }

        const password = role === Role.Receptionist ? 'receptionist@123' : 'serviceStaff@123';
        const selectedRole = role === 'Receptionist' ? Role.Receptionist : Role.ServiceStaff;

        const data = {
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' '),
            email,
            password,
            role: selectedRole,
            serviceTypeId: serviceTypeId || '',
        };

        try {
            const res = await createUser(data).unwrap();
            if (res) {
                toast.success('Staff added successfully');
                resetForm();
                onClose();
                onRefresh();
            }
        } catch {
            toast.error('Add staff failed');
        }
    };

    React.useEffect(() => {
        if (role !== 'Service Staff') {
            setServiceType('');
        }
    }, [role]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '90%', md: '70%', lg: '60%', xl: '50%' },
                    bgcolor: 'white.50',
                    boxShadow: 24,
                    padding: 2,
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                        Add new staff
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{ padding: 2, borderRadius: 2, border: '1px solid #D2D3D7', marginTop: 2 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <CustomInputForm
                            label="Name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                        <CustomInputForm
                            label="Email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            error={!!email && !/^\S+@\S+\.\S+$/.test(email)}
                            helperText={email && !/^\S+@\S+\.\S+$/.test(email) ? 'Invalid email address' : ''}
                        />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, marginTop: 2 }}>
                        <CustomSelectingForm
                            label="Role"
                            placeholder="Select role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            options={Roles}
                        />
                        {role === 'Service Staff' && (
                            <CustomSelectingForm
                                label="Service Type"
                                placeholder="Select service type"
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                                options={ServiceTypes}

                            />
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Button
                        sx={{
                            width: 100,
                            fontSize: 14,
                            fontWeight: 600,
                            textTransform: 'none',
                            padding: '8px 24px',
                            bgcolor: 'white.50',
                            color: '#5C5C5C',
                            border: '1px solid #E0E0E0',
                            ":hover": { borderColor: 'black.900' },
                            borderRadius: 2,
                            ":disabled": { color: 'gray.200', bgcolor: 'gray.100' },
                        }}
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            minWidth: 100,
                            fontSize: 14,
                            fontWeight: 600,
                            textTransform: 'none',
                            padding: '8px 24px',
                            bgcolor: 'primary.500',
                            color: 'white.50',
                            border: '1px solid #FF385C',
                            ":hover": { bgcolor: 'primary.600' },
                            borderRadius: 2,
                            ":disabled": { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' },
                        }}
                        onClick={handleCreateUser}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white.50' }} /> : 'Add Staff'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddNewStaffModal;

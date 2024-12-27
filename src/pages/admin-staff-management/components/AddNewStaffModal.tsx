import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import CustomInputForm from "../../../components/CustomInputForm";
import CustomSelectingForm from "../../../components/CustomSelectingForm";

interface AddNewStaffModalProps {
    open: boolean;
    onClose: () => void;
}

const Roles = ['Receptionist', 'Manager', 'Staff'];
const ServiceTypes = ['Service 1', 'Service 2', 'Service 3'];

const AddNewStaffModal = ({ open, onClose }: AddNewStaffModalProps) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('');
    const [serviceType, setServiceType] = React.useState('');

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '90%', md: '70%', lg: '60%' },
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
                            error={!/^\S+@\S+\.\S+$/.test(email)}
                            helperText={!/^\S+@\S+\.\S+$/.test(email) ? 'Invalid email address' : ''}
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
                        <CustomSelectingForm
                            label="Service Type"
                            placeholder="Select service type"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            options={ServiceTypes}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4, gap: 2 }}>
                    <Button sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'white.50', color: '#5C5C5C', border: '1px solid #E0E0E0', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2 }}>
                        Cancel
                    </Button>
                    <Button sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2 }}>
                        Add Staff
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddNewStaffModal
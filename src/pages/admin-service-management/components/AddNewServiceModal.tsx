import { Box, Modal, Typography, IconButton, Button, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import CustomInputForm from "../../../components/CustomInputForm";
import CustomSelectingForm from "../../../components/CustomSelectingForm";
import React from "react";

interface AddNewServiceModalProps {
    open: boolean;
    onClose: () => void;
}

const serviceTypes = ['Room service', 'Food service', 'Drink service', 'Other'];

const AddNewServiceModal = ({ open, onClose }: AddNewServiceModalProps) => {
    const [serviceName, setServiceName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [serviceType, setServiceType] = React.useState('');
    const [description, setDescription] = React.useState('');

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '90%', md: '70%', lg: '70%' },
                    bgcolor: 'white.50',
                    boxShadow: 24,
                    padding: 2,
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'black.900' }}>
                        Add new service
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{ padding: 2, borderRadius: 2, border: '1px solid #D2D3D7', marginTop: 2 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <CustomInputForm
                            label="Service name"
                            placeholder="Enter service name"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            type="text"
                        />
                        <CustomInputForm
                            label="Price"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                        />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1 fr', gap: 2, mt: 2 }}>
                        <CustomSelectingForm
                            label="Service type"
                            placeholder="Select service type"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            options={serviceTypes}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                        <Typography sx={{ color: 'black.900', fontSize: 16, fontWeight: 500 }}>
                            Description
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder={'Enter description'}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: 2,
                                    '& fieldset': {
                                        borderColor: 'gray.100',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'black.900',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'black.900',
                                        borderWidth: 1,
                                    },
                                    '& .MuiInputBase-input': {
                                        fontSize: 16,
                                    },
                                },
                            }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Button sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'white.50', color: '#5C5C5C', border: '1px solid #E0E0E0', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2 }}>
                        Cancel
                    </Button>

                    <Button sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2 }}>
                        Add Service
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddNewServiceModal
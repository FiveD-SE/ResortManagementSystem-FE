import { Box, Modal, Typography, IconButton, Button, TextField, CircularProgress } from "@mui/material";
import { Close } from "@mui/icons-material";
import CustomInputForm from "../../../components/CustomInputForm";
import CustomSelectingForm from "../../../components/CustomSelectingForm";
import React from "react";
import { IServiceTypeApiResponse } from "../../../types";
import { useCreateServiceMutation } from "../../../apis/serviceApi";
import toast from "react-hot-toast";

interface AddNewServiceModalProps {
    serviceTypeData: IServiceTypeApiResponse | undefined;
    open: boolean;
    onClose: () => void;
    onRefetch: () => void;
}

const AddNewServiceModal = ({ serviceTypeData, open, onClose, onRefetch }: AddNewServiceModalProps) => {
    const [serviceName, setServiceName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [serviceType, setServiceType] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [createService, { isLoading }] = useCreateServiceMutation();

    const serviceTypes = React.useMemo(() => {
        if (!serviceTypeData?.docs) return [];
        return serviceTypeData.docs.map((serviceType) => ({
            label: serviceType.typeName,
            value: serviceType.id,
        }));
    }, [serviceTypeData]);

    const serviceTypeId = serviceTypes.find((serviceType) => serviceType.label === serviceType.label)?.value || '';

    const validateForm = () => {
        if (!serviceName) {
            toast.error('Service name is required');
            return false;
        }
        if (!price) {
            toast.error('Price is required');
            return false;
        }
        if (!serviceType) {
            toast.error('Service type is required');
            return false;
        }
        if (!description) {
            toast.error('Description is required');
            return false;
        }
        return true;
    }

    const resetForm = () => {
        setServiceName('');
        setPrice('');
        setServiceType('');
        setDescription('');
    }

    const handleCreateService = async () => {
        if (!validateForm()) return;
        const data = {
            serviceName,
            price: parseInt(price),
            serviceTypeId: serviceTypeId,
            description,
        };

        try {
            await createService(data).unwrap();
            toast.success('Create service successfully');
        } catch (error) {
            console.error(error);
            toast.error('Create service failed');
        } finally {
            onClose();
            resetForm();
            onRefetch();
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => { onClose(); resetForm(); }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '90%', md: '70%', lg: '70%', xl: '50%' },
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
                            options={serviceTypes.map((serviceType) => serviceType.label)}
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
                    <Button sx={{ width: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'white.50', color: '#5C5C5C', border: '1px solid #E0E0E0', ":hover": { borderColor: 'black.900' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100' } }} onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button sx={{ minWidth: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' } }} onClick={handleCreateService} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white.50' }} /> : 'Add Service'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddNewServiceModal
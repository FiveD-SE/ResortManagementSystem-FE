import { Close } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Modal, TextField, Typography } from "@mui/material";
import CustomSelectingForm from "../../../components/CustomSelectingForm";
import CustomInputForm from "../../../components/CustomInputForm";
import React from "react";
import { IService, IServiceTypeApiResponse } from "../../../types";
import { useUpdateServiceMutation } from "../../../apis/serviceApi";
import toast from "react-hot-toast";

interface EditServiceModalProps {
    selectedService: IService | undefined;
    serviceTypeData: IServiceTypeApiResponse | undefined;
    open: boolean;
    onClose: () => void;
    onRefetch: () => void;
}

const EditServiceModal = ({ selectedService, serviceTypeData, open, onClose, onRefetch }: EditServiceModalProps) => {
    const [serviceName, setServiceName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [serviceType, setServiceType] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        const getServiceTypeName = serviceTypeData?.docs.find((serviceType) => serviceType.id === selectedService?.serviceTypeId)?.typeName || '';

        if (selectedService) {
            setServiceName(selectedService.serviceName);
            setPrice(selectedService.price.toString());
            setServiceType(getServiceTypeName);
            setDescription(selectedService.description || '');
        }

    }, [selectedService]);

    const [updateService, { isLoading }] = useUpdateServiceMutation();

    const serviceTypes = React.useMemo(() => {
        if (!serviceTypeData?.docs) return [];
        return serviceTypeData.docs.map((serviceType) => ({
            label: serviceType.typeName,
            value: serviceType.id,
        }));
    }, [serviceTypeData]);

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

    const handleUpdateService = async () => {
        if (!validateForm()) return;

        const serviceTypeId = serviceTypes.find((type) => type.label === serviceType)?.value || '';

        const data = {
            id: selectedService?.id || '',
            serviceName,
            price: parseInt(price),
            serviceTypeId,
            description,
        };
        try {
            await updateService(data).unwrap();
            toast.success('Update service successfully');
            onClose();
            resetForm();
            onRefetch();
        } catch {
            toast.error('Update service failed');
        }
    }

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
                    width: { xs: '90%', sm: '90%', md: '70%', lg: '70%', xl: '50%' },
                    bgcolor: 'white.50',
                    boxShadow: 24,
                    padding: 2,
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'black.900' }}>
                        Update service information
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
                            onChange={(e) => setPrice(e.target.value.toString())}
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
                    <Button sx={{ width: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' } }} onClick={handleUpdateService} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white.50' }} /> : 'Save'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default EditServiceModal
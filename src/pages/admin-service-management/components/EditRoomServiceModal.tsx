import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Typography, TextField, Button, CircularProgress } from '@mui/material';
import React from 'react'
import CustomInputForm from '../../../components/CustomInputForm';
import toast from 'react-hot-toast';
import { useUpdateRoomServiceMutation } from '../../../apis/roomServiceApi';
import { IRoomService } from '../../../types/roomService';

interface EditRoomServiceModalProps {
    open: boolean;
    onClose: () => void;
    selectedRoomService: IRoomService | undefined;
    onRefetch: () => void;
}

export const EditRoomServiceModal = ({ open, onClose, selectedRoomService, onRefetch }: EditRoomServiceModalProps) => {
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [roomServiceName, setRoomServiceName] = React.useState('');
    const [updateRoomService, { isLoading }] = useUpdateRoomServiceMutation();

    React.useEffect(() => {
        if (selectedRoomService) {
            setPrice(selectedRoomService.price.toString());
            setDescription(selectedRoomService.description);
            setRoomServiceName(selectedRoomService.serviceName);
        }
    }, [selectedRoomService]);

    const validateForm = () => {
        if (!roomServiceName) {
            toast.error('Room service name is required');
            return false;
        }
        if (!price) {
            toast.error('Price is required');
            return false;
        }
        return true;
    }

    const resetForm = () => {
        setPrice('');
        setDescription('');
    }

    const handleUpdateRoomService = async () => {
        if (!validateForm()) return;

        try {
            await updateRoomService({ id: selectedRoomService?.id || '', serviceName: roomServiceName, description, price: parseInt(price) });
            toast.success('Room service created successfully');
            onClose();
            resetForm();
            onRefetch();
        } catch {
            toast.error('Failed to create room service');
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => { onClose(); resetForm() }}
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
                        Update room service
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{ padding: 2, borderRadius: 2, border: '1px solid #D2D3D7', marginTop: 2 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <CustomInputForm
                            label="Room service name"
                            placeholder="Enter room service name"
                            value={roomServiceName}
                            onChange={(e) => setRoomServiceName(e.target.value)}
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
                    <Button sx={{ minWidth: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' } }} onClick={handleUpdateRoomService} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white.50' }} /> : 'Save'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

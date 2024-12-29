import { Box, Modal, Typography, IconButton, TextField, Button, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import React from 'react'
import CustomInputForm from '../../../components/CustomInputForm';
import { useCreatePromotionMutation } from '../../../apis/promotionApi';
import toast from 'react-hot-toast';

interface AddPromotionModalProps {
    open: boolean;
    onClose: () => void;
}

const AddPromotionModal = ({ open, onClose }: AddPromotionModalProps) => {
    const [promotionName, setPromotionName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [discount, setDiscount] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [amount, setAmount] = React.useState('');

    const [createPromotion, { isLoading }] = useCreatePromotionMutation();

    const validateForm = () => {
        if (!promotionName) {
            toast.error('Please enter promotion name');
            return false;
        }
        if (!discount) {
            toast.error('Please enter discount');
            return false;
        }
        if (!startDate) {
            toast.error('Please enter start date');
            return false;
        }
        if (!endDate) {
            toast.error('Please enter end date');
            return false;
        }
        return true;
    }

    const resetForm = () => {
        setPromotionName('');
        setDescription('');
        setDiscount('');
        setStartDate('');
        setEndDate('');
        setAmount('');
    }

    const handleCreatePromotion = async () => {
        if (!validateForm()) return;

        const data = {
            promotionName,
            description,
            discount: Number(discount),
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            amount: Number(amount),
        }

        try {
            await createPromotion(data).unwrap();
            toast.success('Create promotion successfully');
            onClose();
            resetForm();
        } catch (error) {
            toast.error('Create promotion failed');
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => { onClose(); resetForm() }}
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
                        Add new promotion
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{ padding: 2, borderRadius: 2, border: '1px solid #D2D3D7', mt: 2 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <CustomInputForm
                            label="Name"
                            placeholder='Enter promotion name'
                            value={promotionName}
                            onChange={(e) => setPromotionName(e.target.value)}
                            type='text'
                        />

                        <CustomInputForm
                            label="Discount"
                            placeholder='Enter discount'
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            type='number'
                        />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
                        <CustomInputForm
                            label="Start date"
                            placeholder='Enter start date'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            type='date'
                        />

                        <CustomInputForm
                            label="End date"
                            placeholder='Enter end date'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            type='date'
                        />
                    </Box>
                    <Box sx={{ gap: 2, mt: 2 }}>
                        <CustomInputForm
                            label="Amount"
                            placeholder='Enter amount'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type='number'
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                        <Typography sx={{ color: 'black.900', fontSize: 16, fontWeight: 500 }}>
                            Description
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
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
                    <Button sx={{ minWidth: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' } }} onClick={handleCreatePromotion} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white.50' }} /> : 'Add Promotion'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddPromotionModal
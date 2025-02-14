import { Box, Modal, Typography, IconButton, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import React from 'react'
import CustomInputForm from '../../../components/CustomInputForm';
import { IPromotion } from '../../../types';

interface ViewDetailPromotionModalProps {
    selectedPromotion: IPromotion | undefined;
    open: boolean;
    onClose: () => void;
}

const ViewDetailPromotionModal = ({ open, onClose, selectedPromotion }: ViewDetailPromotionModalProps) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [discount, setDiscount] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [amount, setAmount] = React.useState('');

    React.useEffect(() => {
        if (selectedPromotion) {
            setName(selectedPromotion.promotionName)
            setDescription(selectedPromotion.description || '')
            setDiscount(selectedPromotion.discount.toString())
            setStartDate(new Date(selectedPromotion.startDate).toISOString().split('T')[0])
            setEndDate(new Date(selectedPromotion.endDate).toISOString().split('T')[0])
            setAmount(selectedPromotion.amount.toString())
        }
    }, [selectedPromotion])

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
                        Update new promotion
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type='text'
                        />

                        <CustomInputForm
                            label="Discount (%)"
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
            </Box>
        </Modal>
    )
}

export default ViewDetailPromotionModal
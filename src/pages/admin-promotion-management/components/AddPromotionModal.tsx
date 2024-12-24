import { Box, Modal, Typography, IconButton, TextField, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import React from 'react'
import CustomInputForm from '../../../components/CustomInputForm';

interface AddPromotionModalProps {
    open: boolean;
    onClose: () => void;
}

const AddPromotionModal = ({ open, onClose }: AddPromotionModalProps) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [discount, setDiscount] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                    <Button sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'white.50', color: '#5C5C5C', border: '1px solid #E0E0E0', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2 }}>
                        Cancel
                    </Button>

                    <Button sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2 }}>
                        Add Promotion
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddPromotionModal
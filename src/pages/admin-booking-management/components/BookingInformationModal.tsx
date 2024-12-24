import { Box, Modal, Typography, IconButton, Divider } from '@mui/material'
import { Check, Close } from '@mui/icons-material'

interface BookingInformationModalProps {
    open: boolean
    onClose: () => void
}

const BookingInformationModal = ({ open, onClose }: BookingInformationModalProps) => {
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
                    width: '90%',
                    bgcolor: 'white.50',
                    boxShadow: 24,
                    padding: 2,
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'black.900' }}>
                        Booking Information
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', height: '80vh', gap: 2 }}>
                    {/* Room Image Section */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 2, padding: 1, border: '1px solid', borderColor: 'gray.100' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'gray.100', height: '50%', borderRadius: 1 }} />

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, height: '50%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'gray.500', borderRadius: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'gray.500', borderRadius: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'gray.500', borderRadius: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'gray.500', borderRadius: 1 }} />
                        </Box>
                    </Box>
                    {/* Customer Information */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 2 }}>
                        <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'black.900' }}>
                            Customer name
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                            ID:
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Check in
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    Sat, 24 Dec 2022
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Check out
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    Sun, 25 Dec 2022
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Issued Date
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    Tue, 20 Dec 2022
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Room Type
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    Single Room
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Status
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    Pending
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Room Number
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    101
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                Extras
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                    <Check color='success' fontSize='small' />
                                    <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                        Extra 1
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                    <Check color='success' fontSize='small' />
                                    <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                        Extra 1
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                    <Check color='success' fontSize='small' />
                                    <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                        Extra 1
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                    <Check color='success' fontSize='small' />
                                    <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                        Extra 1
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {/* Booking Summary */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, bgcolor: '#F7F7F7', borderRadius: 2 }}>
                        <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'black.900' }}>
                            Booking Summary
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.300', fontWeight: 500 }}>
                                Room Total (1 night)
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 500 }}>
                                $100
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.300', fontWeight: 500 }}>
                                Extra Person
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 500 }}>
                                $20
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.300', fontWeight: 500 }}>
                                Extra
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 500 }}>
                                $20
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.300', fontWeight: 500 }}>
                                Subtotal
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 500 }}>
                                $140
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.300', fontWeight: 500 }}>
                                Discount
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 500 }}>
                                $33.00 (10%)
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'primary.600', fontWeight: 500 }}>
                                Total
                            </Typography>
                            <Typography sx={{ fontSize: 18, color: 'primary.600', fontWeight: 500 }}>
                                $320.00
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default BookingInformationModal

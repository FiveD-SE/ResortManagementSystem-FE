import { Add, Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import CustomInputForm from "../../../components/CustomInputForm";
import CustomSelectingForm from "../../../components/CustomSelectingForm";

interface AddNewRoomModalProps {
    open: boolean;
    onClose: () => void;
}

const statuses = ['Available', 'Unavailable'];
const roomTypes = ['Single', 'Double', 'Triple', 'Quad', 'Queen', 'King', 'Twin', 'Double-double', 'Studio', 'Master Suite', 'Mini Suite', 'President Suite'];

const AddNewRoomModal = ({ open, onClose }: AddNewRoomModalProps) => {
    const [roomNumber, setRoomNumber] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [roomType, setRoomType] = React.useState('');
    const [status, setStatus] = React.useState('');

    return (
        <Modal
            open={open}
            onClose={onClose}
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
                        Add new room
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>

                <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'black.900' }}>Room pictures</Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2, mt: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px dashed #D2D3D7', borderRadius: 2, padding: 2, height: 150, gap: 1 }}>
                        <Add fontSize="large" sx={{ color: "gray.200" }} />
                        <Typography sx={{ fontSize: 16, color: 'gray.200' }}>Add picture</Typography>
                    </Box>
                </Box>

                <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'black.900', marginTop: 2 }}>Room details</Typography>

                <Box sx={{ padding: 2, borderRadius: 2, border: '1px solid #D2D3D7', marginTop: 2 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <CustomInputForm
                            label="Room number"
                            placeholder="Enter room number"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            type="number"
                        />
                        <CustomInputForm
                            label="Price"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                        />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
                        <CustomSelectingForm
                            label="Room type"
                            placeholder="Select room type"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            options={roomTypes}
                        />
                        <CustomSelectingForm
                            label="Status"
                            placeholder="Select status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            options={statuses}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Button sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'white.50', color: '#5C5C5C', border: '1px solid #E0E0E0', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2 }}>
                        Cancel
                    </Button>

                    <Button sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2 }}>
                        Add Room
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddNewRoomModal
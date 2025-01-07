import { Add, Close, Delete } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import CustomInputForm from "../../../components/CustomInputForm";
import CustomSelectingForm from "../../../components/CustomSelectingForm";
import { useCreateRoomMutation } from "../../../apis/roomApi";
import toast from "react-hot-toast";
import { IRoomTypeApiResponse } from "../../../types";
import { RoomStatus } from "../../../types";

interface AddNewRoomModalProps {
    roomTypesData: IRoomTypeApiResponse | undefined;
    open: boolean;
    onClose: () => void;
    onRefetch: () => void;
}

const AddNewRoomModal = ({ roomTypesData, open, onClose, onRefetch }: AddNewRoomModalProps) => {
    const [roomNumber, setRoomNumber] = React.useState('');
    const [pricePerNight, setPricePerNight] = React.useState('');
    const [roomType, setRoomType] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [roomPictures, setRoomPictures] = React.useState<File[]>([]);
    const [basePrice, setBasePrice] = React.useState({ under: 0, upper: 0 });

    const roomTypeNameOptions = roomTypesData?.docs.map((roomType) => roomType.typeName) || [];
    const statuses = [RoomStatus.Available, RoomStatus.Occupied, RoomStatus.Under_Maintenance];

    const [createRoom, { isLoading }] = useCreateRoomMutation();

    const validateForm = () => {
        if (!roomNumber) {
            toast.error('Room number is required');
            return false;
        }

        if (!pricePerNight) {
            toast.error('Price is required');
            return false;
        }

        if (!roomType) {
            toast.error('Room type is required');
            return false;
        }

        if (!status) {
            toast.error('Status is required');
            return false;
        }

        if (roomPictures.length === 0) {
            toast.error('Room pictures are required');
            return false;
        }

        return true;
    }

    const resetForm = () => {
        setRoomNumber('');
        setPricePerNight('');
        setRoomType('');
        setStatus('');
        setRoomPictures([]);
    }

    const handleAddRoom = async () => {
        if (!validateForm()) return;

        const roomTypeId = roomTypesData?.docs.find((roomTypeData) => roomTypeData.typeName === roomType)?.id || '';

        const formData = new FormData();
        formData.append('roomNumber', roomNumber);
        formData.append('roomTypeId', roomTypeId);
        formData.append('status', status);
        formData.append('pricePerNight', pricePerNight);

        roomPictures.forEach((picture) => {
            formData.append('images', picture);
        });

        try {
            await createRoom(formData).unwrap();
            toast.success('Room added successfully');
            resetForm();
            onClose();
            onRefetch();
        } catch {
            toast.error('Failed to add room');
        }
    };

    const handleRoomTypeChange = (selectedRoomType: string) => {
        setRoomType(selectedRoomType);

        const selectedType = roomTypesData?.docs.find((roomType) => roomType.typeName === selectedRoomType);
        if (selectedType) {
            const { basePrice } = selectedType;
            const under = basePrice * 0.5; // -50%
            const upper = basePrice * 1.5; // +50%
            setBasePrice({ under, upper });
        } else {
            setBasePrice({ under: 0, upper: 0 });
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
                        Add new room
                    </Typography>
                    <IconButton onClick={() => { onClose(); resetForm(); }}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>

                <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'black.900' }}>Room pictures</Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridAutoFlow: 'column',
                        gridAutoColumns: '30%',
                        gap: 2,
                        mt: 2,
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        scrollbarWidth: 'none',
                    }}
                >
                    {roomPictures.map((picture, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                height: 150,
                                cursor: 'pointer',
                                overflow: 'hidden',
                                borderRadius: 2,
                                ":hover .delete-overlay": { opacity: 1 },
                                ":hover img": { filter: 'brightness(0.8)' },
                                transition: 'ease 0.3s',
                            }}
                        >
                            {/* Ảnh */}
                            <img
                                src={URL.createObjectURL(picture)}
                                alt={`room-${index}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    transition: 'ease 0.3s',
                                }}
                            />
                            <Box
                                className="delete-overlay"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white.50',
                                    fontSize: 18,
                                    fontWeight: 500,
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                    zIndex: 2,
                                    gap: 1,
                                }}
                                onClick={() => setRoomPictures((prev) => prev.filter((_, i) => i !== index))}
                            >
                                <Delete /> Delete
                            </Box>
                        </Box>
                    ))}
                    <label htmlFor="room-picture-upload">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px dashed',
                                borderColor: 'gray.200',
                                borderRadius: 2,
                                padding: 2,
                                height: 150,
                                gap: 1,
                                color: 'gray.200',
                                cursor: 'pointer',
                                ":hover": {
                                    color: 'black.900',
                                    borderColor: 'black.900',
                                },
                                transition: 'ease 0.3s',
                            }}
                        >
                            <Add fontSize="large" />
                            <Typography sx={{ fontSize: 16 }}>Add pictures</Typography>
                        </Box>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        id="room-picture-upload"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            const validFiles = files.filter((file) => file.type.startsWith('image/'));
                            setRoomPictures((prev) => [...prev, ...validFiles]);
                        }}
                    />
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
                        <CustomSelectingForm
                            label="Room type"
                            placeholder="Select room type"
                            value={roomType}
                            onChange={(e) => handleRoomTypeChange(e.target.value)}
                            options={roomTypeNameOptions}
                        />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
                        <CustomInputForm
                            label={`Price ($${basePrice.under.toFixed(2)} - $${basePrice.upper.toFixed(2)})`}
                            placeholder="Enter price"
                            value={pricePerNight}
                            onChange={(e) => setPricePerNight(e.target.value)}
                            type="number"
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
                    <Button sx={{ width: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'white.50', color: '#5C5C5C', border: '1px solid #E0E0E0', ":hover": { borderColor: 'black.900' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100' } }} onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button sx={{ minWidth: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' } }} onClick={handleAddRoom} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white.50' }} /> : 'Add Room'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddNewRoomModal
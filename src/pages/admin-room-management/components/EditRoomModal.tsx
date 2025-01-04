import { Add, Close, Delete } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import CustomInputForm from "../../../components/CustomInputForm";
import CustomSelectingForm from "../../../components/CustomSelectingForm";
import { useUpdateRoomMutation } from "../../../apis/roomApi";
import toast from "react-hot-toast";
import { IRoom, IRoomTypeApiResponse } from "../../../types";
import { RoomStatus } from "../../../types";

interface EditRoomModalProps {
    roomTypesData: IRoomTypeApiResponse | undefined;
    selectedRoom: IRoom | undefined;
    open: boolean;
    onClose: () => void;
}

const EditRoomModal = ({ roomTypesData, selectedRoom, open, onClose }: EditRoomModalProps) => {
    const [roomNumber, setRoomNumber] = React.useState('');
    const [pricePerNight, setPricePerNight] = React.useState('');
    const [roomType, setRoomType] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [images, setImages] = React.useState<File[]>([]);

    const roomTypeNameOptions = roomTypesData?.docs.map((roomType) => roomType.typeName) || [];
    const statuses = [RoomStatus.Available, RoomStatus.Occupied, RoomStatus.Under_Maintenance];
    const getRoomTypeNameById = (id: string) => roomTypesData?.docs.find((roomType) => roomType.id === id)?.typeName || '';

    React.useEffect(() => {
        const fetchImagesAsFiles = async (imageUrls: string[]) => {
            const files = await Promise.all(
                imageUrls.map(async (url) => {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    const fileName = url.split('/').pop() || 'room-image';
                    return new File([blob], fileName, { type: blob.type });
                })
            );
            setImages(files);
        };

        if (selectedRoom) {
            setRoomNumber(selectedRoom.roomNumber);
            setPricePerNight(selectedRoom.pricePerNight.toString());
            setRoomType(getRoomTypeNameById(selectedRoom.roomTypeId));
            setStatus(selectedRoom.status);
            fetchImagesAsFiles(selectedRoom.images);
        }
    }, [selectedRoom]);

    const [updateRoom, { isLoading }] = useUpdateRoomMutation();

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

        if (images.length === 0) {
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
        setImages([]);
    }

    const handleUpdateRoom = async () => {
        if (!validateForm()) return;

        const id = selectedRoom?.id || '';
        const roomTypeId = roomTypesData?.docs.find((roomTypeData) => roomTypeData.typeName === roomType)?.id || '';

        const formData = new FormData();
        formData.append('roomNumber', roomNumber);
        formData.append('roomTypeId', roomTypeId);
        formData.append('status', status);
        formData.append('pricePerNight', pricePerNight);

        images.forEach((picture) => {
            formData.append('images', picture);
        });

        try {
            await updateRoom({ id, formData }).unwrap();
            toast.success('Room updated successfully');
            resetForm();
            onClose();
        } catch {
            toast.error('Failed to update room');
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
                        Update room information
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
                    {images.map((picture, index) => (
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
                                onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
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
                            setImages((prev) => [...prev, ...validFiles]);
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
                        <CustomInputForm
                            label="Price"
                            placeholder="Enter price"
                            value={pricePerNight}
                            onChange={(e) => setPricePerNight(e.target.value)}
                            type="number"
                        />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
                        <CustomSelectingForm
                            label="Room type"
                            placeholder="Select room type"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            options={roomTypeNameOptions}
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
                    <Button sx={{ minWidth: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' } }} onClick={handleUpdateRoom} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} sx={{ color: 'white.50' }} /> : 'Save'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default EditRoomModal
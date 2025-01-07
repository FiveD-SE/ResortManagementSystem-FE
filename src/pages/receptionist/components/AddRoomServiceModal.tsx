import { Box, Modal, Typography, IconButton, Button } from '@mui/material'
import { IRoomService } from '../../../types/roomService'
import { AddRounded, Close, RemoveRounded } from '@mui/icons-material'
import React from 'react';
import { useAddRoomServicesInBookingMutation } from '../../../apis/bookingApi';
import toast from 'react-hot-toast';
import { IBooking } from '../../../types';

interface AddRoomServiceModalProps {
    open: boolean;
    onClose: () => void;
    selectedRoomServices: IRoomService[];
    setSelectedRoomServices: React.Dispatch<React.SetStateAction<IRoomService[]>>;
    roomServices: { docs: IRoomService[] } | undefined;
    selectedBooking: IBooking | undefined;
    setOpenAddRoomServiceModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddRoomServiceModal = ({
    open,
    onClose,
    selectedRoomServices,
    setSelectedRoomServices,
    roomServices,
    selectedBooking,
    setOpenAddRoomServiceModal,
}: AddRoomServiceModalProps) => {
    const handleAddService = (serviceId: string) => {
        setSelectedRoomServices((prev: IRoomService[]) => {
            const existingService = prev.find((service) => service.id === serviceId); // Dùng roomServiceId
            if (existingService) {
                // Nếu dịch vụ đã có, tăng số lượng
                return prev.map((service) =>
                    service.id === serviceId // Dùng roomServiceId
                        ? { ...service, quantity: (service.quantity || 0) + 1 }
                        : service
                );
            } else {
                // Thêm dịch vụ mới vào selectedRoomServices
                const service = roomServices?.docs.find((roomService) => roomService.id === serviceId);
                if (service) {
                    // Khởi tạo quantity là 1 khi thêm dịch vụ mới
                    return [...prev, { ...service, quantity: 1 }];
                }
            }
            return prev;
        });
    };

    const [addRoomServicesInBooking] = useAddRoomServicesInBookingMutation();

    const handleApplyRoomServices = async () => {
        if (!selectedBooking) return;

        const roomServices = selectedRoomServices.map((service) => ({
            id: service.id,
            quantity: service.quantity || 0,
        }));

        await addRoomServicesInBooking({
            bookingId: selectedBooking.id,
            data: roomServices,
        }).unwrap();
        toast.success('Room services added successfully');
        setOpenAddRoomServiceModal(false);
    }

    const handleRemoveService = (serviceId: string) => {
        setSelectedRoomServices((prev: IRoomService[]) => {
            const existingService = prev.find((service) => service.id === serviceId); // Dùng roomServiceId
            if (existingService) {
                if ((existingService.quantity || 0) > 1) {
                    // Giảm số lượng nếu số lượng lớn hơn 1
                    return prev.map((service) =>
                        service.id === serviceId // Dùng roomServiceId
                            ? { ...service, quantity: (service.quantity || 0) - 1 }
                            : service
                    );
                } else {
                    // Xóa dịch vụ nếu số lượng bằng 1
                    return prev.filter((service) => service.id !== serviceId);
                }
            }
            return prev;
        });
    };

    const getServiceQuantity = (serviceId: string) => {
        const service = selectedRoomServices.find((service) => service.id === serviceId); // Dùng roomServiceId
        return service ? service.quantity : 0; // Trả về quantity
    };

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
                    bgcolor: 'white.50',
                    boxShadow: 24,
                    padding: 3,
                    borderRadius: 2,
                    width: { xs: '90%', sm: '50%', md: '40%' },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'black.900' }}>
                        Add Room Services
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
                    {roomServices?.docs.map((roomService, index) => (
                        <Box
                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            key={index}
                        >
                            <Typography sx={{ fontSize: 16, fontWeight: 500, color: 'black.900' }}>
                                {roomService.serviceName}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconButton
                                    sx={{ padding: 0 }}
                                    onClick={() => handleRemoveService(roomService.id)}
                                >
                                    <RemoveRounded sx={{ height: 20, width: 20 }} />
                                </IconButton>
                                <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'black.900', width: 20, textAlign: 'center' }}>
                                    {getServiceQuantity(roomService.id)}
                                </Typography>
                                <IconButton
                                    sx={{ padding: 0 }}
                                    onClick={() => handleAddService(roomService.id)}
                                >
                                    <AddRounded sx={{ height: 20, width: 20 }} />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                    <Button
                        onClick={handleApplyRoomServices}
                        sx={{ minWidth: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '4px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2, ":disabled": { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' } }}
                    >
                        Apply
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};


export default AddRoomServiceModal
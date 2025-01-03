import React from 'react';
import { Box, Modal, Typography, IconButton, Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import { IBooking } from '../../../types/booking';
import { formatPrice } from '../../../utils';

interface BookingInformationModalProps {
    open: boolean;
    onClose: () => void;
    selectedBooking: IBooking | undefined;
}

const BookingInformationModal = ({ open, onClose, selectedBooking }: BookingInformationModalProps) => {
    const [formattedData, setFormattedData] = React.useState({
        customerName: '',
        phoneNumber: '',
        checkinDate: '',
        checkoutDate: '',
        issuedDate: '',
        roomType: '',
        status: '',
        roomNumber: '',
        extras: [] as { serviceName: string; price: string }[],
        roomTotal: '',
        extra: '',
        subtotal: '',
        total: '',
        discount: '',
        nights: 0,
        images: [] as string[],
    });

    React.useEffect(() => {
        if (!selectedBooking) return;

        const checkinDate = selectedBooking.checkinDate ? new Date(selectedBooking.checkinDate).toDateString() : 'N/A';
        const checkoutDate = selectedBooking.checkoutDate ? new Date(selectedBooking.checkoutDate).toDateString() : 'N/A';
        const issuedDate = selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toDateString() : 'N/A';

        const customerName = `${selectedBooking.customerId.firstName} ${selectedBooking.customerId.lastName}`;
        const phoneNumber = selectedBooking.customerId.phoneNumber || '';
        const roomType = selectedBooking.roomId.roomTypeId.typeName;
        const status = selectedBooking.status;
        const roomNumber = selectedBooking.roomId.roomNumber;

        // Tính toán số ngày ở
        const nights =
            selectedBooking.checkinDate && selectedBooking.checkoutDate
                ? Math.ceil(
                    (new Date(selectedBooking.checkoutDate).getTime() - new Date(selectedBooking.checkinDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                )
                : 0;

        // Tổng tiền phòng
        const roomTotal =
            selectedBooking.roomId.pricePerNight && nights
                ? formatPrice(selectedBooking.roomId.pricePerNight * nights)
                : formatPrice(0);

        // Tổng tiền dịch vụ thêm
        const extras = selectedBooking.services.map((service) => ({
            serviceName: service.serviceId.serviceName,
            price: formatPrice(service.serviceId.price),
        }));
        const extraTotal = formatPrice(
            selectedBooking.services.reduce((acc, service) => acc + service.serviceId.price, 0)
        );

        // Tổng cộng trước giảm giá
        const subtotal =
            selectedBooking.roomId.pricePerNight && nights
                ? formatPrice(
                    selectedBooking.roomId.pricePerNight * nights +
                    selectedBooking.services.reduce((acc, service) => acc + service.serviceId.price, 0)
                )
                : formatPrice(0);

        // Giảm giá
        const discount = selectedBooking.promotionId
            ? `${formatPrice(selectedBooking.totalAmount * (selectedBooking.promotionId.discount / 100))} (${selectedBooking.promotionId.discount}%)`
            : formatPrice(0);

        // Tổng tiền sau giảm giá
        const total = formatPrice(selectedBooking.totalAmount);

        // Ảnh phòng
        const images = selectedBooking.roomId.images.map((image) => image);

        setFormattedData({
            customerName,
            phoneNumber,
            checkinDate,
            checkoutDate,
            issuedDate,
            roomType,
            status,
            roomNumber,
            extras,
            roomTotal,
            extra: extraTotal,
            subtotal,
            total,
            discount,
            nights,
            images,
        });
    }, [selectedBooking]);

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

                <Box sx={{ display: 'flex', flexDirection: 'row', height: '80vh', gap: 2, mt: 1, p: 1 }}>
                    {/* Room Image Section */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 2, padding: 1, boxShadow: 4 }}>
                        {/* Main Image */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'gray.100', height: '50%', borderRadius: 1 }} >
                            <img
                                src={formattedData.images[0]}
                                alt="Main Room"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                        </Box>
                        {/* Sub Images */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, height: '50%' }}>
                            {formattedData.images.slice(1, 5).map((image, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        bgcolor: 'gray.500',
                                        borderRadius: 1,
                                        overflow: 'hidden',
                                        mb: index > 1 ? 1 : 0,
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt="Sub Room"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    {/* Customer Information */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 2, p: 2 }}>
                        <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'black.900' }}>
                            {formattedData.customerName}
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                            Tel: {formattedData.phoneNumber}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Check in
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    {formattedData.checkinDate}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Check out
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    {formattedData.checkoutDate}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Issued Date
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    {formattedData.issuedDate}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Room Type
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    {formattedData.roomType}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Status
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    {formattedData.status}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '50%' }}>
                                <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                    Room Number
                                </Typography>
                                <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                    {formattedData.roomNumber}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 600 }}>
                                Extras
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {formattedData?.extras.map((service, index) => (
                                    <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                                        <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                            {service.serviceName}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, color: 'black.300', fontWeight: 400 }}>
                                            {service.price}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    {/* Booking Summary */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 2, p: 2, bgcolor: '#F7F7F7' }}>
                        <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'black.900' }}>
                            Booking Summary
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.300', fontWeight: 500 }}>
                                Room Total ({formattedData?.nights} night)
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 500 }}>
                                {formatPrice(selectedBooking?.roomId?.pricePerNight ? selectedBooking.roomId.pricePerNight * (selectedBooking?.checkoutDate && selectedBooking?.checkinDate ? Math.ceil((new Date(selectedBooking.checkoutDate).getTime() - new Date(selectedBooking.checkinDate).getTime()) / (1000 * 60 * 60 * 24)) : 0) : 0)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.300', fontWeight: 500 }}>
                                Extra Person
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 500 }}>
                                $0
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.300', fontWeight: 500 }}>
                                Extra
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 500 }}>
                                {formattedData.extra}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.300', fontWeight: 500 }}>
                                Subtotal
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 500 }}>
                                {formattedData.subtotal}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'black.300', fontWeight: 500 }}>
                                Discount
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'black.900', fontWeight: 500 }}>
                                {formattedData.discount}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: 16, color: 'primary.600', fontWeight: 500 }}>
                                Total
                            </Typography>
                            <Typography sx={{ fontSize: 18, color: 'primary.600', fontWeight: 500 }}>
                                {formattedData.total}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default BookingInformationModal

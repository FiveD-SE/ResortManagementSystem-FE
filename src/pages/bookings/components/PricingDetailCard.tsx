import { StarRounded } from '@mui/icons-material';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { IRoomDetailApiResponse, IService } from '../../../types';
import { formatPrice } from '../../../utils';

interface PricingDetailCardProps {
  roomDetail: IRoomDetailApiResponse | null;
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
  discount: number;
  services: IService[];
}

const PricingDetailCard = ({ roomDetail, checkInDate, checkOutDate, discount, services }: PricingDetailCardProps) => {
  const averageRating = roomDetail?.ratings
    ? roomDetail.ratings.reduce((acc, rating) => acc + rating.average, 0) / (roomDetail.ratings.length || 1)
    : 0;

  const nights = checkInDate && checkOutDate ? dayjs(checkOutDate).diff(dayjs(checkInDate), 'day') : 0;

  const roomPrice = roomDetail ? roomDetail.room.pricePerNight * nights : 0;
  const serviceFee = services.reduce((acc, service) => acc + service.price, 0);
  const discountAmount = roomPrice * (discount / 100);
  const totalPrice = roomPrice - discountAmount + serviceFee;

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, borderRadius: 2, border: 1, borderColor: 'black.100' }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar
          variant="rounded"
          sx={{ width: 128, height: 128, backgroundColor: 'gray.300' }}
          src={roomDetail?.room.images[0]}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'black.300' }}>
              {roomDetail?.roomType.typeName}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black.500' }}>
              {roomDetail?.room.roomNumber}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarRounded sx={{ fontSize: 14 }} />
              <Typography variant="body1" sx={{ color: 'black.500' }}>
                {averageRating.toFixed(1)}
              </Typography>
              <Typography variant="body1" sx={{ color: 'black.300' }}>
                ({roomDetail?.ratings.length} reviews)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'black.500' }}>
          Price details
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            {formatPrice(Number.parseFloat(roomDetail?.room.pricePerNight?.toString() || '0'))} x {nights}{' '}
            {nights > 1 ? 'nights' : 'night'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            {formatPrice(roomPrice)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            Discount
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            -{formatPrice(discountAmount)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            Service fee
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            {formatPrice(serviceFee)}
          </Typography>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontSize: 16, color: 'black.500', fontWeight: 700 }}>
            Total
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 16, color: 'black.500', fontWeight: 700 }}>
            {formatPrice(totalPrice)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PricingDetailCard;

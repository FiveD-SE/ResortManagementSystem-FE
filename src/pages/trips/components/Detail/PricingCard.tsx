import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import { IBooking } from '../../../../types/booking';
import { formatPrice } from '../../../../utils';
import dayjs from 'dayjs';

interface IProps {
  data: IBooking | null;
}

const PricingCard = (props: IProps) => {
  const { data } = props;
  const roomPrice = data?.roomId.pricePerNight || 0;
  const nights = data?.checkinDate && data?.checkoutDate ? dayjs(data.checkoutDate).diff(dayjs(data.checkinDate), 'day') : 0;
  const totalServiceFee = data?.services?.reduce((acc, service) => acc + service.serviceId.price * service.quantity, 0) || 0;
  const totalDiscount = data?.promotionId?.discount ? (((roomPrice ?? 0) * data?.promotionId?.discount) / 100) * nights : 0;
  const totalAmount = (roomPrice ?? 0) * nights + totalServiceFee - totalDiscount;

  return (
    <Stack spacing={3} sx={{ padding: 4, border: '1px solid #E0E0E0', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar
          variant="rounded"
          sx={{ width: 128, height: 128, backgroundColor: 'gray.300' }}
          src={data?.roomId.images[0]}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'black.300' }}>
              {data?.roomId.roomTypeId.typeName}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black.500' }}>
              {data?.roomId.roomNumber}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" sx={{ color: 'black.500' }}>
          Price details
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            {formatPrice(Number.parseFloat(roomPrice.toString() || '0'))} x {nights} {nights > 1 ? 'nights' : 'night'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            {formatPrice(roomPrice * nights)}
          </Typography>
        </Box>
        {data?.promotionId && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              Discount
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              -{formatPrice(Number.parseFloat(data?.promotionId?.discount.toString() || '0'))}
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            Service fee
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            {formatPrice(totalServiceFee)}
          </Typography>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontSize: 16, color: 'black.500', fontWeight: 700 }}>
            Total
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 16, color: 'black.500', fontWeight: 700 }}>
            {formatPrice(totalAmount)}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default PricingCard;

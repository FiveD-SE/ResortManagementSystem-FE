import { Box, Divider, Stack, Typography } from '@mui/material';
import { IBooking } from '../../../../types';

interface IProps {
  data: IBooking | null;
}

function calculateDaysBetween(date1: Date, date2: Date) {
  // Convert both dates to milliseconds
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // Calculate the difference in milliseconds
  const diffInMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  return Math.round(diffInMs / (1000 * 60 * 60 * 24));
}

const PricingCard = (props: IProps) => {
  const { data } = props;
  const totalNight = data?.checkinDate && data?.checkoutDate ? calculateDaysBetween(data.checkinDate, data.checkoutDate) : 0;
  const totalServiceFee = data?.services?.reduce((acc, service) => acc + service.serviceId.price * service.quantity, 0) || 0;
  const totalAmount = (data?.roomId.pricePerNight ?? 0) * totalNight + totalServiceFee;
  return (
    <Stack spacing={3} sx={{ padding: 4, border: '1px solid #E0E0E0', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }} gap={2}>
        <img src={data?.roomId.images[0]} style={{ borderRadius: 6, width: 150, height: 100 }} />
        <Box gap={2}>
          <Typography variant="h5" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            {data?.roomId.roomNumber}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Be Vietnam Pro' }}>
            {data?.roomId.roomTypeId.typeName}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
          Price Details
        </Typography>
        <Stack gap={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">
              {data?.roomId.pricePerNight}đ x {totalNight} nights
            </Typography>
            <Typography variant="body1">{(data?.roomId.pricePerNight ?? 0) * totalNight}đ</Typography>
          </Box>
          {data?.promotionId && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Discount</Typography>
              <Typography variant="body1">$2,500</Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Service fee</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box>
                {data?.services?.map((service) => (
                  <Typography variant="body1" key={service.id} sx={{ textAlign: 'right' }}>
                    {service.serviceId.price * service.quantity}đ
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Stack>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            Total (VND)
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            {totalAmount}đ
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PricingCard;

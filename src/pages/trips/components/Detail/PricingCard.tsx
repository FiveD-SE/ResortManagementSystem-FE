import { Box, Divider, Stack, Typography } from '@mui/material';
import { IBooking } from '../../../../types/booking';

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
  const totalDiscount = data?.promotionId?.discount
    ? (((data.roomId.pricePerNight ?? 0) * data.promotionId.discount) / 100) * totalNight
    : 0;
  const totalAmount = (data?.roomId.pricePerNight ?? 0) * totalNight + totalServiceFee - totalDiscount;
  return (
    <Stack spacing={3} sx={{ padding: 4, border: '1px solid #E0E0E0', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }} gap={2}>
        <img src={data?.roomId.images[0]} style={{ borderRadius: 6, width: 150, height: 100 }} />
        <Box gap={2}>
          <Typography variant="h1" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            {data?.roomId.roomNumber}
          </Typography>
          <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 20 }}>{data?.roomId.roomTypeId.typeName}</Typography>
        </Box>
      </Box>
      <Divider />
      <Stack spacing={2}>
        <Typography variant="h2" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
          Price Details
        </Typography>
        <Stack gap={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 20 }}>
              {data?.roomId.pricePerNight}đ x {totalNight} nights
            </Typography>
            <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 20 }}>
              {(data?.roomId.pricePerNight ?? 0) * totalNight}đ
            </Typography>
          </Box>
          {data?.promotionId && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 20 }}>Discount</Typography>
              <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 20 }}>
                {' '}
                - {data?.promotionId.discount}% ({totalDiscount}đ)
              </Typography>
            </Box>
          )}
          {data?.services && data.services.length > 0 && (
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
          )}
        </Stack>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600, fontSize: 20 }}>
            Total (VND)
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600, fontSize: 20 }}>
            {totalAmount}đ
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PricingCard;

import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IBooking } from '../../../../../../types';

interface IProps {
  info: IBooking | null;
}

const convertDateTime = (date: Date) => {
  return new Date(date).toLocaleDateString('en-GB');
};

const BookingInfo = (props: IProps) => {
  const { info } = props;
  console.log(info?.checkinDate);
  return (
    <Box>
      <Box>
        <Typography variant="h4" sx={{ fontFamily: 'Be Vietnam Pro' }}>
          {info?.customerId.firstName + ' ' + info?.customerId.lastName}
        </Typography>
        <Typography variant="body3" sx={{ fontFamily: 'Be Vietnam Pro' }}>
          ID: {info?.customerId.id}
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid size={6}>
            <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              Check-in
            </Typography>
            <Typography variant="body3" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              {info?.checkinDate ? convertDateTime(info.checkinDate) : 'N/A'}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              Check-out
            </Typography>
            <Typography variant="body3" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              {info?.checkoutDate ? convertDateTime(info.checkoutDate) : 'N/A'}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              Issued Date
            </Typography>
            <Typography variant="body3" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              N/A
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              Room Type
            </Typography>
            <Typography variant="body3" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              {info?.roomId.roomTypeId.typeName}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              Status
            </Typography>
            <Typography variant="body3" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              {info?.status}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="h6" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              Room Number
            </Typography>
            <Typography variant="body3" sx={{ fontFamily: 'Be Vietnam Pro' }}>
              {info?.roomId.roomNumber}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BookingInfo;

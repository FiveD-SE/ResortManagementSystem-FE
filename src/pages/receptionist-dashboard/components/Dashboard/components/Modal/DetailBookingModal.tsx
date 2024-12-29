import { Box, IconButton, Modal, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import BookingSummary from './BookingSummary';
import BookingInfo from './BookingInfo';
import ImageHolder from './ImageHolder';
import CloseIcon from '@mui/icons-material/Close';
import { IBooking } from '../../../../../../types';

interface IProps {
  open: boolean;
  onClose: () => void;
  data: IBooking | null;
}

const DetailBookingModal = (props: IProps) => {
  const { open, onClose, data } = props;
  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          bgcolor: 'white.50',
          boxShadow: 24,
          padding: 2,
          borderRadius: 2,
          flexWrap: 'wrap',
          flex: 1,
        }}
      >
        <Box sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro' }}>
            Booking Detail
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container spacing={3} sx={{ flex: 1 }}>
          <Grid size={4}>
            <ImageHolder images={data?.roomId.images || []} />
          </Grid>
          <Grid size={4}>
            <BookingInfo info={data} />
          </Grid>
          <Grid size={4}>
            <BookingSummary onClose={onClose} data={data} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DetailBookingModal;

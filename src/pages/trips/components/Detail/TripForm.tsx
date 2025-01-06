import { Box, Button, Divider, IconButton, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import { TRIPS_FORM } from '../../constant';
import { IBooking } from '../../../../types/booking';
import { formatDate, formatPrice } from '../../../../utils';
import { AccountBalanceRounded, AddRounded, PaymentsRounded } from '@mui/icons-material';
import AddMoreServiceDialog from './AddMoreServiceDialog';
import { useState } from 'react';

interface IProps {
  booking: IBooking | null;
  refetchBooking: () => void;
}

const TripForm = (props: IProps) => {
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const { booking, refetchBooking } = props;
  const totalGuest = (booking?.guests?.adults || 0) + (booking?.guests?.children || 0);
  const paymentMethod =
    booking?.paymentMethod === 'Pay on arrival'
      ? {
          icon: <PaymentsRounded sx={{ color: 'black.500' }} />,
          text: 'Pay on arrival',
        }
      : {
          icon: <AccountBalanceRounded sx={{ color: 'black.500' }} />,
          text: 'Transfer',
        };

  const handleOpenAddServiceDialog = () => {
    setIsAddServiceDialogOpen(true);
  };

  const handleCloseAddServiceDialog = () => {
    setIsAddServiceDialogOpen(false);
  };

  return (
    <Stack spacing={2} gap={2} sx={{ mb: 2 }}>
      <Typography variant="h5" component="h1" sx={{ color: 'black.500' }}>
        Your booking
      </Typography>
      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Booking Date
        </Typography>
        <Typography variant="body1" sx={{}}>
          {formatDate(booking?.createdAt || new Date())}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Guest
        </Typography>
        <Typography variant="body1" sx={{}}>
          {totalGuest} {totalGuest > 1 ? 'guests' : 'guest'}
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Payment
        </Typography>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 1.5,
            width: '100%',
            borderRadius: 2,
            border: 1,
            borderColor: 'black.100',
            position: 'relative',
          }}
        >
          {paymentMethod.icon}
          <Typography variant="body2" sx={{ flex: 1, color: 'black.500', fontWeight: 500 }}>
            {paymentMethod.text}
          </Typography>
        </Paper>
      </Box>
      {booking?.promotionId && (
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Voucher
          </Typography>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1.5,
              borderRadius: 2,
              border: 1,
              borderColor: 'black.100',
              minWidth: 200,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', color: 'black.500', fontWeight: 500 }}>
                {booking?.promotionId?.promotionName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'black.300',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 500,
                }}
              >
                {booking?.promotionId?.description}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'primary.50',
                  py: 0.5,
                  px: 2,
                  borderRadius: 2,
                  width: 'fit-content',
                }}
              >
                <Typography variant="caption" sx={{ color: 'primary.500' }}>
                  -{booking?.promotionId?.discount}%
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}

      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Adds-on service
          <IconButton
            size="medium"
            sx={{ p: 0, ml: 1, borderColor: 'black.100', border: 1 }}
            onClick={handleOpenAddServiceDialog}
          >
            <AddRounded sx={{ fontSize: 16 }} />
          </IconButton>
        </Typography>
        <List
          dense
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            overflowX: 'auto',
            width: '100%',
            padding: 0,
          }}
        >
          {booking?.services?.map((service) => (
            <ListItem key={service.id} sx={{ width: 'auto', p: 0 }}>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'black.100',
                  minWidth: 200,
                  cursor: 'pointer',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', color: 'black.500', fontWeight: 500 }}>
                    {service.serviceId.serviceName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'black.300',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 200,
                    }}
                  >
                    {service.serviceId.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'primary.500' }}>
                    {formatPrice(Number.parseFloat(service.serviceId.price.toString()))}
                  </Typography>

                  <Typography variant="caption" sx={{ color: 'black.500', fontWeight: 500 }}>
                    Qty: {service.quantity}
                  </Typography>
                </Box>
              </Paper>
            </ListItem>
          ))}
        </List>
        <AddMoreServiceDialog
          roomTypeId={booking?.roomId.roomTypeId._id || ''}
          open={isAddServiceDialogOpen}
          onClose={handleCloseAddServiceDialog}
          refetchBooking={refetchBooking}
        />
      </Box>

      {booking?.status === 'Checked out' && (
        <Box>
          <Button
            variant="contained"
            sx={{
              width: 'fit-content',
              py: 1.5,
              px: 3,
              textTransform: 'none',
              borderRadius: 3,
              backgroundColor: 'primary.500',
            }}
          >
            <Typography variant="h6" sx={{}} onClick={() => (window.location.href = `/trips/review/${booking?.id}`)}>
              {TRIPS_FORM.START_TO_REVIEW}
            </Typography>
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default TripForm;

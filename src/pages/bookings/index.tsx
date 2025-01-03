import { Box, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import Header from './components/Header';
import TripDetails from './components/TripDetails';
import Payment from './components/Payment';
import Voucher from './components/Voucher';
import AddsOnService from './components/AddsOnService';
import PricingDetailCard from './components/PricingDetailCard';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { PaymentsRounded } from '@mui/icons-material';
import { useGetRoomDetailByIdQuery } from '../../apis/roomApi';
import { IPromotion, IService, PaymentMethod } from '../../types';
import { useCreateBookingMutation } from '../../apis/bookingApi';
import toast from 'react-hot-toast';
import { ICreateBookingRequest } from '../../types/booking';
import { BOOKING_SUCCESS_MESSAGE, BOOKING_SYSTEM_ERROR_MESSAGE } from '../../constants/messages';
import CustomDialog from '../../components/CustomDialog';
import { ROUTES } from '../../constants/routes';
import { useAppSelector } from '../../stores/store';
import { useChangeProfileMutation } from '../../apis/userApi';
import Cookies from 'js-cookie';

const Bookings = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useAppSelector((state) => state.user);
  const { data: roomDetail } = useGetRoomDetailByIdQuery(roomId ?? '', {
    skip: !roomId,
  });
  const navigate = useNavigate();
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();
  const [changeProfile, { isLoading: isLoadingChangeProfile, isSuccess: isSuccessChangeProfile }] =
    useChangeProfileMutation();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(user?.phoneNumber || null);
  const [searchParams] = useSearchParams();
  const checkInDateFromParams = searchParams.get('checkin');
  const checkOutDateFromParams = searchParams.get('checkout');
  const adultsFromParams = searchParams.get('adults');
  const childrenFromParams = searchParams.get('children');
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(checkInDateFromParams ? dayjs(checkInDateFromParams) : null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(
    checkOutDateFromParams ? dayjs(checkOutDateFromParams) : null,
  );
  const [guests, setGuests] = useState({
    adults: adultsFromParams ? parseInt(adultsFromParams) : 1,
    children: childrenFromParams ? parseInt(childrenFromParams) : 0,
  });
  useEffect(() => {
    setCheckInDate(checkInDateFromParams ? dayjs(checkInDateFromParams) : null);
    setCheckOutDate(checkOutDateFromParams ? dayjs(checkOutDateFromParams) : null);
  }, [checkInDateFromParams, checkOutDateFromParams]);

  useEffect(() => {
    setGuests({
      adults: adultsFromParams ? parseInt(adultsFromParams) : 1,
      children: childrenFromParams ? parseInt(childrenFromParams) : 0,
    });
  }, [adultsFromParams, childrenFromParams]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<{
    icon: JSX.Element;
    text: string;
  }>({
    icon: <PaymentsRounded sx={{ color: 'black.500' }} />,
    text: 'Pay on arrival',
  });

  const handlePaymentMethodSelect = (method: { icon: JSX.Element; text: string }) => {
    setSelectedPaymentMethod(method);
  };

  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const handleSelectServices = (service: IService): void => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const [selectedPromotion, setSelectedPromotion] = useState<IPromotion | null>(null);

  const handleSelectPromotion = (promotion: IPromotion): void => {
    setSelectedPromotion((prev) => (prev?.id === promotion.id ? null : promotion));
  };

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [countdown, setCountdown] = useState(30);
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (showPaymentDialog) {
      timerId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [showPaymentDialog]);

  useEffect(() => {
    if (countdown <= 0) {
      navigate(ROUTES.HOME);
    }
  }, [countdown, navigate]);

  const [requiredPhoneNumberDialog, setRequiredPhoneNumberDialog] = useState(false);

  const handleUpdatePhoneNumber = async () => {
    try {
      const response = await changeProfile({
        phoneNumber: phoneNumber || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
      }).unwrap();
      if (isSuccessChangeProfile) {
        const updatedUser = { ...user, phoneNumber: response.data.phoneNumber };
        Cookies.set('user', JSON.stringify(updatedUser));
        toast.success('Phone number updated successfully');
        setPhoneNumber(response.data.phoneNumber);
        setRequiredPhoneNumberDialog(false);
      }
    } catch (error) {
      console.error('Failed to update phone number:', error);
      toast.error('Failed to update phone number');
    }
  };

  const handleCreateBooking = async () => {
    if (!roomId || !checkInDate || !checkOutDate) {
      toast.error(BOOKING_SYSTEM_ERROR_MESSAGE);
      return;
    }

    if (!phoneNumber || phoneNumber === '') {
      setRequiredPhoneNumberDialog(true);
      return;
    }

    const bookingData: Partial<ICreateBookingRequest> = {
      checkinDate: checkInDate.toDate(),
      checkoutDate: checkOutDate.toDate(),
      guests: guests,
      paymentMethod: selectedPaymentMethod.text as PaymentMethod,
      serviceIds: selectedServices.map((service) => service.id),
    };

    if (selectedPromotion) {
      bookingData.promotionId = selectedPromotion.id;
    }

    try {
      const response = await createBooking({ roomId, data: bookingData as ICreateBookingRequest }).unwrap();
      console.log('Booking created:', response);
      toast.success(BOOKING_SUCCESS_MESSAGE);
      setRequiredPhoneNumberDialog(false);
      if (selectedPaymentMethod.text === 'Transfer') {
        setShowPaymentDialog(true);
      } else {
        navigate(ROUTES.TRIPS.DETAIL.replace(':id', response.id));
      }
    } catch (error) {
      console.error('Failed to create booking:', error);
      toast.error(BOOKING_SYSTEM_ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    if (isSuccessChangeProfile && phoneNumber) {
      handleCreateBooking();
    }
  }, [isSuccessChangeProfile, phoneNumber]);

  return (
    <Container>
      <Header />
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
            <TripDetails
              guests={guests}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guestAmount={roomDetail?.roomType.guestAmount || 1}
              occupiedDates={roomDetail?.occupiedDates || []}
            />
            <Payment selectedPaymentMethod={selectedPaymentMethod} handlePaymentMethodSelect={handlePaymentMethodSelect} />
            <Voucher selectedPromotion={selectedPromotion} handleSelectPromotion={handleSelectPromotion} />
            <AddsOnService selectedServices={selectedServices} handleSelectServices={handleSelectServices} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                pb: 2,
                justifyContent: 'center',
                gap: 2,
                pt: 2,
                borderTop: 1,
                borderColor: 'black.50',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: 'fit-content',
                  py: 2,
                  px: 4,
                  backgroundColor: 'primary.500',
                  borderRadius: 3,
                }}
                onClick={handleCreateBooking}
                disabled={isCreateBookingLoading}
              >
                <Typography sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }}>Request to book</Typography>
                <CircularProgress
                  size={20}
                  sx={{ color: 'primary.500', display: isCreateBookingLoading ? 'block' : 'none', ml: 2 }}
                />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
            <PricingDetailCard
              roomDetail={roomDetail ?? null}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              discount={selectedPromotion?.discount || 0}
              services={selectedServices}
            />
          </Grid>
        </Grid>
      </Box>
      <CustomDialog open={showPaymentDialog} onClose={() => setShowPaymentDialog(false)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5" gutterBottom>
            Please check your email to complete the payment process.
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" gutterBottom>
            You will be redirect to Home after {countdown} seconds
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: 'fit-content',
              backgroundColor: 'primary.500',
              borderRadius: 3,
            }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            <Typography sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }}>Continue</Typography>
          </Button>
        </Box>
      </CustomDialog>
      <CustomDialog open={requiredPhoneNumberDialog} onClose={() => setRequiredPhoneNumberDialog(false)}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Please enter your phone number to complete the booking process.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Your phone number will be used to contact you for booking confirmation.
            </Typography>
            <TextField
              label="Phone number"
              variant="outlined"
              fullWidth
              defaultValue={user?.phoneNumber}
              onChange={(e) => {
                if (user) {
                  setPhoneNumber(e.target.value);
                }
              }}
            />
            <Button
              variant="contained"
              sx={{
                width: 'fit-content',
                backgroundColor: 'primary.500',
                borderRadius: 3,
                p: 1.5,
              }}
              onClick={handleUpdatePhoneNumber}
              disabled={isLoadingChangeProfile}
            >
              <Typography sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }}>Submit</Typography>
            </Button>
          </Box>
        </Box>
      </CustomDialog>
    </Container>
  );
};

export default Bookings;

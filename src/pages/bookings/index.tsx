import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Header from './components/Header';
import TripDetails from './components/TripDetails';
import Payment from './components/Payment';
import Voucher from './components/Voucher';
import AddsOnService from './components/AddsOnService';
import PricingDetailCard from './components/PricingDetailCard';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { PaymentsRounded } from '@mui/icons-material';
import { useGetRoomDetailByIdQuery } from '../../apis/roomApi';
import { IPromotion, IService } from '../../types';

const Bookings = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { data: roomDetail } = useGetRoomDetailByIdQuery(roomId ?? '', {
    skip: !roomId,
  });

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
    setSelectedPromotion(promotion);
  };

  return (
    <Container>
      <Header />
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <TripDetails
              guests={guests}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guestAmount={roomDetail?.roomType.guestAmount || 1}
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
              >
                <Typography sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }}>Request to book</Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
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
    </Container>
  );
};

export default Bookings;

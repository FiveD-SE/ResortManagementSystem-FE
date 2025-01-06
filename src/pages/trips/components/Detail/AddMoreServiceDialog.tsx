import { useCallback, useEffect, useRef, useState } from 'react';
import CustomDialog from '../../../../components/CustomDialog';
import { Box, Button, Checkbox, Container, Grid, List, ListItem, Paper, Skeleton, Typography } from '@mui/material';
import { formatPrice } from '../../../../utils';
import { IService, IServiceApiResponse } from '../../../../types';
import { useGetServiceByRoomTypeQuery } from '../../../../apis/serviceApi';
import { useParams } from 'react-router-dom';
import { useAddServicesToBookingMutation } from '../../../../apis/bookingApi';
import toast from 'react-hot-toast';
import { ADD_SERVICE_SUCCESS_MESSAGE } from '../../../../constants/messages';
import QuantityPicker from './QuantityPicker';

interface ObserverEntry {
  isIntersecting: boolean;
}

interface IAddMoreServiceDialogProps {
  roomTypeId: string;
  open: boolean;
  onClose: () => void;
  refetchBooking: () => void;
}

interface SelectedService {
  service: IService;
  quantity: number;
}

const AddMoreServiceDialog = ({ roomTypeId, open, onClose, refetchBooking }: IAddMoreServiceDialogProps) => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [addServices, { isSuccess, isLoading }] = useAddServicesToBookingMutation();
  const [currentServices, setCurrentServices] = useState<IServiceApiResponse | null>(null);
  const {
    data: servicesData,
    isLoading: isLoadingServices,
    isFetching: isFetchingServices,
  } = useGetServiceByRoomTypeQuery(
    {
      roomTypeId: roomTypeId,
      page: page,
      limit: 12,
      sortBy: 'price',
      sortOrder: 'asc',
    },
    {
      skip: roomTypeId === '',
    },
  );
  const loader = useRef(null);

  const hasNextPage = servicesData?.hasNextPage;
  const totalPages = servicesData?.totalPages;

  const handleObserver = useCallback(
    (entries: ObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isLoadingServices && !isFetchingServices && page < (totalPages ?? 0)) {
        setPage((prev) => prev + 1);
      }
    },
    [hasNextPage, isLoadingServices, isFetchingServices, page, totalPages],
  );

  const handleSelectServices = (service: IService): void => {
    if (selectedServices.some((s) => s.service.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.service.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, { service, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (serviceId: string, newQuantity: number) => {
    setSelectedServices(selectedServices.map((s) => (s.service.id === serviceId ? { ...s, quantity: newQuantity } : s)));
  };

  const handleClearAll = () => {
    setSelectedServices([]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    if (servicesData && servicesData.docs) {
      setCurrentServices((prev) => {
        if (prev) {
          return {
            ...prev,
            docs: [...prev.docs, ...servicesData.docs],
          };
        } else {
          return servicesData;
        }
      });
    }
  }, [servicesData]);

  const isServiceSelected = (service: IService) => {
    return selectedServices.some((selectedService) => selectedService.service.id === service.id);
  };

  const handleApply = () => {
    if (id) {
      addServices({
        bookingId: id,
        data: { servicesWithQuantities: selectedServices.map((s) => ({ serviceId: s.service.id, quantity: s.quantity })) },
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(ADD_SERVICE_SUCCESS_MESSAGE);
      refetchBooking();
      onClose();
    }
  }, [isSuccess, refetchBooking, onClose]);

  const totalPrice = selectedServices.reduce((total, selectedService) => {
    return total + selectedService.service.price * selectedService.quantity;
  }, 0);

  const chunkedSelectedServices = [];
  for (let i = 0; i < selectedServices.length; i += 5) {
    chunkedSelectedServices.push(selectedServices.slice(i, i + 5));
  }

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      actions={
        <Container
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderTop: 1, borderTopColor: 'black.50', pt: 2 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'black.500', fontWeight: 500 }}>
              Selected services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Grid container spacing={1}>
                {chunkedSelectedServices.map((chunk, chunkIndex) => (
                  <Grid item xs={4} key={chunkIndex * 10}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {chunk.map((selectedService) => (
                        <Typography key={selectedService.service.id} variant="body2" sx={{ color: 'black.500' }}>
                          • {selectedService.service.serviceName} x {selectedService.quantity}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="body1" sx={{ color: 'primary.500', fontWeight: 600 }}>
                Total: {formatPrice(totalPrice)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
            <Button variant="text" onClick={handleClearAll} sx={{ px: 3, py: 2, borderRadius: 3 }} disableTouchRipple>
              <Typography variant="body2" sx={{ color: 'black.500', fontWeight: 600, fontSize: 14, textTransform: 'none' }}>
                Clear all
              </Typography>
            </Button>
            <Button
              variant="contained"
              onClick={handleApply}
              sx={{ px: 3, py: 2, borderRadius: 3 }}
              disableElevation
              disabled={selectedServices.length === 0 || isLoading}
            >
              <Typography variant="body2" sx={{ color: 'white.50', fontWeight: 600, fontSize: 14, textTransform: 'none' }}>
                {isLoading ? 'Applying...' : 'Apply'}
              </Typography>
            </Button>
          </Box>
        </Container>
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 2,
          pt: 2,
          pb: 1.5,
          px: 0,
          position: 'relative',
        }}
      >
        <Typography variant="h6" component="div" sx={{ color: 'black.500', px: 3 }}>
          Adds-on service
        </Typography>
        <List
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflowY: 'auto',
            maxHeight: 400,
            py: 0,
            px: 3,
          }}
        >
          {currentServices?.docs.map((service) => (
            <ListItem key={service.id} sx={{ width: '100%', p: 0 }}>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  border: 1,
                  borderColor: isServiceSelected(service) ? 'primary.500' : 'black.100',
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                <Checkbox checked={isServiceSelected(service)} onClick={() => handleSelectServices(service)} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: 'black.500', fontWeight: 500 }}>
                    {service.serviceName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'black.300',
                    }}
                  >
                    {service.description}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: 'primary.500' }}>
                    {formatPrice(service.price)}{' '}
                    <Typography variant="caption" sx={{ color: 'black.500' }}>
                      / person
                    </Typography>
                  </Typography>
                </Box>
                {isServiceSelected(service) && (
                  <QuantityPicker
                    initialQuantity={selectedServices.find((s) => s.service.id === service.id)?.quantity || 1}
                    onChange={(newQuantity) => handleQuantityChange(service.id, newQuantity)}
                  />
                )}
              </Paper>
            </ListItem>
          ))}
          {isFetchingServices &&
            Array.from({ length: 12 }).map((_, index) => (
              <ListItem key={index} sx={{ width: '100%', p: 0 }}>
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
                    width: '100%',
                  }}
                >
                  <Skeleton variant="circular" width={48} height={48} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </Box>
                </Paper>
              </ListItem>
            ))}
          <ListItem ref={loader} sx={{ width: '100%', p: 0, height: isFetchingServices ? 0 : 'auto' }} />
        </List>
      </Box>
    </CustomDialog>
  );
};

export default AddMoreServiceDialog;

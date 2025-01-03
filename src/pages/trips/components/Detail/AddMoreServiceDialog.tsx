import React, { useCallback, useEffect, useRef, useState } from 'react';
import CustomDialog from '../../../../components/CustomDialog';
import { Box, Button, Checkbox, Container, List, ListItem, Paper, Skeleton, Typography } from '@mui/material';
import { formatPrice } from '../../../../utils';
import { IService, IServiceApiResponse } from '../../../../types';
import { useGetServicesQuery } from '../../../../apis/serviceApi';
import { useParams } from 'react-router-dom';
import { useAddServicesToBookingMutation } from '../../../../apis/bookingApi';
import toast from 'react-hot-toast';
import { ADD_SERVICE_SUCCESS_MESSAGE } from '../../../../constants/messages';

interface ObserverEntry {
  isIntersecting: boolean;
}

interface IAddMoreServiceDialogProps {
  open: boolean;
  onClose: () => void;
  refetchBooking: () => void;
}

const AddMoreServiceDialog = ({ open, onClose, refetchBooking }: IAddMoreServiceDialogProps) => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [addServices, { isSuccess, isLoading }] = useAddServicesToBookingMutation();
  const [currentServices, setCurrentServices] = useState<IServiceApiResponse | null>(null);
  const {
    data: servicesData,
    isLoading: isLoadingServices,
    isFetching: isFetchingServices,
  } = useGetServicesQuery({
    page: page,
    limit: 12,
    sort: 'asc',
  });
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
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
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
    return selectedServices.some((selectedService) => selectedService.id === service.id);
  };

  const handleApply = () => {
    if (id) {
      addServices({ bookingId: id, data: selectedServices.map((service) => service.id) });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(ADD_SERVICE_SUCCESS_MESSAGE);
      refetchBooking();
      onClose();
    }
  }, [isSuccess, refetchBooking, onClose]);

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      actions={
        <Container sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 2 }}>
          <Button variant="text" onClick={handleClearAll} sx={{ px: 3, py: 2, borderRadius: 3 }} disableTouchRipple>
            <Typography variant="body2" sx={{ color: 'black.500', fontWeight: 600, fontSize: 14, textTransform: 'none' }}>
              Clear all
            </Typography>
          </Button>
          <Button
            variant="contained"
            onClick={handleApply}
            sx={{ px: 3, py: 2, borderRadius: 3, backgroundColor: 'black.500' }}
            disableElevation
            disabled={selectedServices.length === 0 || isLoading}
          >
            <Typography variant="body2" sx={{ color: 'white.50', fontWeight: 600, fontSize: 14, textTransform: 'none' }}>
              {isLoading ? 'Applying...' : 'Apply'}
            </Typography>
          </Button>
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
                onClick={() => handleSelectServices(service)}
              >
                <Checkbox checked={isServiceSelected(service)} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: 'black.500', fontWeight: 500 }}>
                    {service.serviceName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'black.300', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {service.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'primary.500' }}>
                    {formatPrice(service.price)}
                  </Typography>
                </Box>
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

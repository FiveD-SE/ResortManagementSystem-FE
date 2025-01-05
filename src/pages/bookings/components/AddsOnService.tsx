import { Box, Checkbox, FormControl, List, ListItem, Paper, Skeleton, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetServicesQuery } from '../../../apis/serviceApi';
import { IService, IServiceApiResponse } from '../../../types';
import { formatPrice } from '../../../utils';
import QuantityPicker from '../../trips/components/Detail/QuantityPicker';

interface ObserverEntry {
  isIntersecting: boolean;
}

interface AddsOnServiceProps {
  selectedServices: {
    service: IService;
    quantity: number;
  }[];
  handleSelectServices: (service: IService, quantity: number) => void;
}

const AddsOnService = ({ selectedServices, handleSelectServices }: AddsOnServiceProps) => {
  const [page, setPage] = useState(1);
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

  const handleQuantityChange = (service: IService, newQuantity: number) => {
    handleSelectServices(service, newQuantity);
  };

  return (
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
        borderTop: 1,
        borderColor: 'black.50',
        position: 'relative',
      }}
    >
      <Typography variant="h6" component="div" sx={{ color: 'black.500' }}>
        Adds-on service
      </Typography>
      <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflowX: 'auto', width: '100%', padding: 0 }}>
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
          {currentServices?.docs.map((service, index) => (
            <ListItem key={service.id + index} sx={{ width: 'auto', p: 0 }}>
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
                  minWidth: 200,
                  cursor: 'pointer',
                }}
              >
                <Checkbox
                  checked={isServiceSelected(service)}
                  onChange={() => handleSelectServices(service, isServiceSelected(service) ? 0 : 1)}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', color: 'black.500', fontWeight: 500 }}>
                    {service.serviceName}
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
                    {service.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'primary.500', fonwtWeight: 500 }}>
                    {formatPrice(service.price)}
                  </Typography>
                </Box>
                {isServiceSelected(service) && (
                  <QuantityPicker
                    initialQuantity={selectedServices.find((s) => s.service.id === service.id)?.quantity || 1}
                    onChange={(newQuantity) => handleQuantityChange(service, newQuantity)}
                  />
                )}
              </Paper>
            </ListItem>
          ))}
          {isFetchingServices &&
            Array.from({ length: 12 }).map((_, index) => (
              <ListItem key={index} sx={{ width: 'auto', p: 0 }}>
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
      </FormControl>
    </Box>
  );
};

export default AddsOnService;

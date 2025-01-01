import { Box, FormControl, List, ListItem, Paper, Radio, Skeleton, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetPromotionsQuery } from '../../../apis/promotionApi';
import { IPromotion, IPromotionApiResponse } from '../../../types';

interface ObserverEntry {
  isIntersecting: boolean;
}

interface VoucherProps {
  selectedPromotion: IPromotion | null;
  handleSelectPromotion: (promotion: IPromotion) => void;
}

const Voucher = ({ selectedPromotion, handleSelectPromotion }: VoucherProps) => {
  const [page, setPage] = useState(1);
  const [currentPromotion, setCurrentPromotion] = useState<IPromotionApiResponse | null>(null);
  const {
    data: promotionData,
    isLoading: isLoadingPromotion,
    isFetching: isFetchingPromotion,
  } = useGetPromotionsQuery({ page: 1, limit: 10 });
  const loader = useRef(null);

  const hasNextPage = promotionData?.hasNextPage;
  const totalPages = promotionData?.totalPages;

  const handleObserver = useCallback(
    (entries: ObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isLoadingPromotion && !isFetchingPromotion && page < (totalPages ?? 0)) {
        setPage((prev) => prev + 1);
      }
    },
    [hasNextPage, isLoadingPromotion, isFetchingPromotion, page, totalPages],
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
    if (promotionData && promotionData.docs) {
      setCurrentPromotion((prev) => {
        if (prev) {
          return {
            ...prev,
            docs: [...prev.docs, ...promotionData.docs],
          };
        } else {
          return promotionData;
        }
      });
    }
  }, [promotionData]);

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
      }}
    >
      <Typography variant="h6" component="div" sx={{ color: 'black.500' }}>
        Voucher
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
          {currentPromotion?.docs.map((promotion, index) => (
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
                  borderColor: selectedPromotion?.id === promotion.id ? 'primary.500' : 'black.100',
                  minWidth: 200,
                }}
                onClick={() => handleSelectPromotion(promotion)}
              >
                <Radio checked={selectedPromotion?.id === promotion.id} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', color: 'black.500', fontWeight: 500 }}>
                    {promotion.promotionName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black.300' }}>
                    {promotion.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'primary.500' }}>
                    {promotion.discount}%
                  </Typography>
                </Box>
              </Paper>
            </ListItem>
          ))}
          {isFetchingPromotion &&
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
          <ListItem ref={loader} sx={{ width: '100%', p: 0, height: isFetchingPromotion ? 0 : 'auto' }} />
        </List>
      </FormControl>
    </Box>
  );
};

export default Voucher;

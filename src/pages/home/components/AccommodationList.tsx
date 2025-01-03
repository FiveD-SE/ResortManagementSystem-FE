import { Box, Button, Grid2 as Grid, Typography } from '@mui/material';
import AccommodationCard from './AccommodationCard';
import AccommodationCardSkeleton from './AccommodationCardSkeleton';
import { resetRoomsState, useFilterQuery } from '../../../apis/roomApi';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IRoomApiResponse } from '../../../types';
interface ObserverEntry {
  isIntersecting: boolean;
}

const AccommodationList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    const roomTypeId = searchParams.get('roomType');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');
    const checkinDate = searchParams.get('checkinDate');
    const checkoutDate = searchParams.get('checkoutDate');
    const guestAmount = searchParams.get('guestAmount');
    const bedroomAmount = searchParams.get('bedroomAmount');
    const bedAmount = searchParams.get('bedAmount');
    const sharedBathAmount = searchParams.get('sharedBathAmount');
    const amenities = searchParams.get('amenities');

    const amenitiesArray = amenities ? amenities.split(',') : undefined;

    return {
      page,
      limit: 12,
      ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
      ...(checkinDate ? { checkinDate } : {}),
      ...(checkoutDate ? { checkoutDate } : {}),
      ...(roomTypeId ? { roomTypeId } : {}),
      ...(guestAmount ? { guestAmount: parseInt(guestAmount, 10) } : {}),
      ...(bedroomAmount ? { bedroomAmount: parseInt(bedroomAmount, 10) } : {}),
      ...(bedAmount ? { bedAmount: parseInt(bedAmount, 10) } : {}),
      ...(sharedBathAmount ? { sharedBathAmount: parseInt(sharedBathAmount, 10) } : {}),
      ...(amenitiesArray ? { amenities: amenitiesArray } : {}),
    };
  }, [searchParams, page]);

  const {
    data: allRoomsData,
    isLoading: isAllRoomsLoading,
    isFetching: isAllRoomsFetching,
    error: allRoomsError,
    refetch: refetchAllRooms,
  } = useFilterQuery(queryParams);

  const loader = useRef(null);
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState<IRoomApiResponse | null>(null);
  const isLoading = isAllRoomsLoading;
  const isFetching = isAllRoomsFetching;
  const error = allRoomsError;

  const hasNextPage = currentData?.hasNextPage;
  const totalPages = currentData?.totalPages;

  useEffect(() => {
    if (page > 1 && allRoomsData) {
      setCurrentData((prevData) => ({
        ...allRoomsData,
        docs: [...(prevData?.docs || []), ...allRoomsData.docs],
      }));
    } else {
      setCurrentData(allRoomsData ?? null);
    }
  }, [allRoomsData, page]);

  const handleCardClick = useCallback(
    (roomId: string) => {
      navigate(`/rooms/${roomId}/detail`);
    },
    [navigate],
  );

  const handleObserver = useCallback(
    (entries: ObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isLoading && !isFetching && page < (totalPages ?? 0)) {
        setPage((prev) => prev + 1);
      }
    },
    [hasNextPage, isLoading, isFetching, page, totalPages],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '12px',
      threshold: 1.0,
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

  const handleClearAll = useCallback(() => {
    setSearchParams({});
    setPage(1);
  }, [setSearchParams]);

  useEffect(() => {
    if (page === 1) {
      setCurrentData(null);
      dispatch(resetRoomsState());
      refetchAllRooms();
    }
  }, [
    queryParams.roomTypeId,
    queryParams.sortBy,
    queryParams.sortOrder,
    queryParams.checkinDate,
    queryParams.checkoutDate,
    queryParams.guestAmount,
    queryParams.bedroomAmount,
    queryParams.bedAmount,
    queryParams.sharedBathAmount,
    queryParams.amenities,
    refetchAllRooms,
    dispatch,
    page,
  ]);

  if (error) {
    console.error('Error fetching rooms:', error);
    return <div>Error loading accommodations.</div>;
  }

  return (
    <Box sx={{ pt: 2, px: 5 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
        {!isLoading && currentData && currentData.docs.length > 0 ? (
          currentData.docs.map((item: any, index) => (
            <Grid key={item.id + index} size={{ xs: 12, sm: 6, md: 2 }}>
              <AccommodationCard
                roomNumber={item.roomNumber}
                roomTypeId={item.roomTypeId}
                roomTypeName={item.roomTypeName}
                averageRating={item.averageRating}
                images={item.images}
                startDate={item.nextAvailableWeek.checkinDate}
                endDate={item.nextAvailableWeek.checkoutDate}
                pricePerNight={item.pricePerNight}
                onCardClick={() => handleCardClick(item.id)}
              />
            </Grid>
          ))
        ) : !isLoading && currentData && currentData.docs.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
              <Typography variant="h6" gutterBottom>
                No rooms found matching your criteria.
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" paragraph>
                Try adjusting your search filters or clearing them to see more results.
              </Typography>
              <Button
                variant="contained"
                onClick={handleClearAll}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  ':hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                <Typography variant="body2" sx={{ color: 'white.50', fontWeight: 600, fontSize: 14, textTransform: 'none' }}>
                  Clear All Filters
                </Typography>
              </Button>
            </Box>
          </Grid>
        ) : (
          Array.from({ length: 12 }).map((_, index) => (
            <Grid key={`skeleton-${index}`} size={{ xs: 12, sm: 6, md: 2 }}>
              <AccommodationCardSkeleton />
            </Grid>
          ))
        )}
        <Box ref={loader} sx={{ width: '100%' }} />
      </Grid>
    </Box>
  );
};

export default AccommodationList;

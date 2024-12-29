import { Box, Grid2 as Grid } from '@mui/material';
import AccommodationCard from './AccommodationCard';
import AccommodationCardSkeleton from './AccommodationCardSkeleton';
import { resetRoomsState, useGetRoomsByRoomTypeIdQuery, useGetRoomsQuery } from '../../../apis/roomApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IRoomApiResponse } from '../../../types';
interface ObserverEntry {
  isIntersecting: boolean;
}

const AccommodationList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const roomTypeId = searchParams.get('roomType');

  const {
    data: allRoomsData,
    isLoading: isAllRoomsLoading,
    isFetching: isAllRoomsFetching,
    error: allRoomsError,
    refetch: refetchAllRooms,
  } = useGetRoomsQuery(
    { page, limit: 12 },
    {
      skip: !!roomTypeId,
    },
  );

  const {
    data: roomTypeData,
    isLoading: isRoomTypeLoading,
    isFetching: isRoomTypeFetching,
    error: roomTypeError,
    refetch: refetchRoomType,
  } = useGetRoomsByRoomTypeIdQuery({ roomTypeId: roomTypeId as string, page, limit: 12 }, { skip: !roomTypeId });

  const loader = useRef(null);
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState<IRoomApiResponse | null>(null);
  const isLoading = roomTypeId ? isRoomTypeLoading : isAllRoomsLoading;
  const isFetching = roomTypeId ? isRoomTypeFetching : isAllRoomsFetching;
  const error = roomTypeId ? roomTypeError : allRoomsError;

  const hasNextPage = currentData?.hasNextPage;
  const totalPages = currentData?.totalPages;

  useEffect(() => {
    if (roomTypeId) {
      setCurrentData(roomTypeData ?? null);
    } else {
      setCurrentData(allRoomsData ?? null);
    }
  }, [roomTypeData, allRoomsData, roomTypeId]);

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

  useEffect(() => {
    setCurrentData(null);
    dispatch(resetRoomsState());
    if (roomTypeId) {
      refetchRoomType();
    } else {
      refetchAllRooms();
    }
    setPage(1);
  }, [roomTypeId, refetchAllRooms, refetchRoomType, dispatch]);

  if (error) {
    console.error('Error fetching rooms:', error);
    return <div>Error loading accommodations.</div>;
  }

  return (
    <Box sx={{ pt: 2, px: 5 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
        {!isLoading &&
          currentData &&
          (Array.isArray(currentData) ? currentData : currentData.docs).map((item: any, index) => (
            <Grid key={item.id + index} size={{ xs: 12, sm: 12, md: 2 }}>
              <AccommodationCard
                roomNumber={item.roomNumber}
                roomTypeId={item.roomTypeId}
                roomTypeName={item.roomTypeName}
                averageRating={item.averageRating}
                images={item.images}
                startDate={item.startDate}
                endDate={item.endDate}
                pricePerNight={item.pricePerNight}
                onCardClick={() => handleCardClick(item.id)}
              />
            </Grid>
          ))}
        {(isLoading || isFetching) &&
          Array.from({ length: 12 }).map((_, index) => (
            <Grid key={`skeleton-${index}`} size={{ xs: 12, sm: 12, md: 2 }}>
              <AccommodationCardSkeleton />
            </Grid>
          ))}
        <Box ref={loader} sx={{ width: '100%' }} />
      </Grid>
    </Box>
  );
};

export default AccommodationList;

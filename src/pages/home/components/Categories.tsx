import { Box, IconButton, Typography } from '@mui/material';
import CategoryBox from './CatetoryBox';
import { ChevronLeftRounded, ChevronRightRounded, TuneRounded } from '@mui/icons-material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetRoomTypesQuery } from '../../../apis/roomTypeApi';
import { useLocation, useSearchParams } from 'react-router-dom';
import FilterDialog from './FilterDialog';
import { resetRoomsState } from '../../../apis/roomApi';
import { useDispatch } from 'react-redux';

function Categories() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const roomTypeId = searchParams.get('roomType');
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleApplyFilters = useCallback(
    (
      sortBy: string | null,
      sortOrder: 'asc' | 'desc' | null,
      selectedRooms: { bedrooms: number; beds: number; bathrooms: number },
      selectedAmenities: string[],
      selectedDates: { checkInDate: Date | null; checkOutDate: Date | null },
      guestCount: { adults: number; children: number },
    ) => {
      if (sortBy) {
        searchParams.set('sortBy', sortBy);
      } else {
        searchParams.delete('sortBy');
      }

      if (sortOrder) {
        searchParams.set('sortOrder', sortOrder);
      } else {
        searchParams.delete('sortOrder');
      }

      if (selectedDates.checkInDate) {
        searchParams.set('checkinDate', selectedDates.checkInDate.toISOString());
      }

      if (selectedDates.checkOutDate) {
        searchParams.set('checkoutDate', selectedDates.checkOutDate.toISOString());
      }

      if (guestCount.adults > 0 || guestCount.children > 0) {
        searchParams.set('guestAmount', (guestCount.adults + guestCount.children).toString());
      } else {
        searchParams.delete('guestAmount');
      }

      if (selectedRooms.bedrooms > 0) {
        searchParams.set('bedroomAmount', selectedRooms.bedrooms.toString());
      } else {
        searchParams.delete('bedroomAmount');
      }

      if (selectedRooms.beds > 0) {
        searchParams.set('bedAmount', selectedRooms.beds.toString());
      } else {
        searchParams.delete('bedAmount');
      }

      if (selectedRooms.bathrooms > 0) {
        searchParams.set('sharedBathAmount', selectedRooms.bathrooms.toString());
      } else {
        searchParams.delete('sharedBathAmount');
      }

      if (selectedAmenities.length > 0) {
        searchParams.set('amenities', selectedAmenities.join(','));
      } else {
        searchParams.delete('amenities');
      }

      setSearchParams(searchParams, { replace: true });
      dispatch(resetRoomsState());
    },
    [searchParams, setSearchParams, dispatch],
  );
  const { data: roomTypesData } = useGetRoomTypesQuery({ page: 1, limit: 10 });

  const handleSelectRoomType = (selectedRoomTypeId: string) => {
    if (roomTypeId === selectedRoomTypeId) {
      searchParams.delete('roomType');
    } else {
      searchParams.set('roomType', selectedRoomTypeId);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (!container) return;

      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft + container.offsetWidth < container.scrollWidth);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const isMainPage = location.pathname === '/';

  if (!isMainPage) {
    return null;
  }

  const handleScroll = (direction: string) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 500;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column-reverse',
          sm: 'row',
        },
        alignItems: 'center',
        overflowX: 'hidden',
        transition: 'box-shadow 0.3s',
        gap: 2,
        px: { xs: 1, sm: 10 },
        py: 1,
        flex: 1,
        width: '100%',
        boxShadow: { xs: '0px 2px 5px rgba(0, 0, 0, 0.1)', sm: 0 },
        scrollbarWidth: 'none',
      }}
    >
      <Box sx={{ display: 'flex', width: '90%', gap: 2, position: 'relative', marginInlineEnd: 2 }}>
        {canScrollLeft && (
          <Box
            sx={{
              position: 'absolute',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              transition: 'opacity 0.3s, visibility 0.3s, transform 0.3s',
              backgroundImage: 'linear-gradient(to left,rgb(255 255 255/0.4),white calc(100% - 24px))',
              zIndex: 1,
              height: '100%',
              left: 0,
            }}
          >
            <IconButton
              onClick={() => handleScroll('left')}
              sx={{
                p: 0.6,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'black.100',
                backgroundColor: 'white.50',
                transition: 'box-shadow 0.3s, background-color 0.3s',
                ':hover': { boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: 'white.50' },
              }}
              children={<ChevronLeftRounded />}
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            gap: 2,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
          }}
          ref={containerRef}
        >
          {roomTypesData?.docs.map((item) => (
            <CategoryBox
              key={item.id}
              label={item.typeName}
              selected={roomTypeId === item.id}
              onClick={() => handleSelectRoomType(item.id)}
            />
          ))}
        </Box>
        {canScrollRight && roomTypesData?.docs && roomTypesData.docs.length > 10 && (
          <Box
            sx={{
              position: 'absolute',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              transition: 'opacity 0.2s, visibility 0.2s, transform 0.2s',
              backgroundImage: 'linear-gradient(to right,rgb(255 255 255/0.4),white calc(100% - 24px))',
              zIndex: 1,
              height: '100%',
              right: 'calc(-1 * 4px)',
              paddingInlineEnd: 1,
            }}
          >
            <IconButton
              onClick={() => handleScroll('right')}
              sx={{
                p: 0.6,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'black.100',
                backgroundColor: 'white.50',
                transition: 'opacity 0.3s, visibility 0.3s, transform 0.3s',
                ':hover': { boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: 'white.50' },
              }}
              children={<ChevronRightRounded />}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          p: 2,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'black.100',
          alignItems: 'center',
          justifyContent: {
            xs: 'center',
            sm: 'flex-start',
          },
          ':hover': {
            borderColor: 'black.200',
            cursor: 'pointer',
            backgroundColor: 'gray.50',
          },
          transition: 'border-color 0.3s, background-color 0.3s',
          width: {
            xs: '100%',
            sm: 'fit-content',
          },
        }}
        onClick={handleOpenDialog}
      >
        <TuneRounded />
        <Typography variant="body2" sx={{ color: 'black.900' }}>
          Filters
        </Typography>
      </Box>
      <FilterDialog open={openDialog} onClose={handleCloseDialog} onApply={handleApplyFilters} />
    </Box>
  );
}

export default Categories;

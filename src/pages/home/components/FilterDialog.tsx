import CustomDialog from '../../../components/CustomDialog';
import { Box, Button, Container, Divider, Grid, IconButton, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import { AddRounded, ExpandMoreRounded, RemoveRounded } from '@mui/icons-material';
import AmenityItem from '../../rooms/components/AmenitiyItem';
import { amenities } from '../../../constants/amenities';
import { useCallback, useState, memo } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (
    sortBy: string | null,
    sortOrder: 'asc' | 'desc' | null,
    selectedRooms: { bedrooms: number; beds: number; bathrooms: number },
    selectedAmenities: string[],
    selectedDates: { checkInDate: Date | null; checkOutDate: Date | null },
    guestCount: GuestCount,
  ) => void;
}

interface SortOption {
  label: string;
  sortBy: 'averageRating' | 'pricePerNight' | null;
  sortOrder: 'asc' | 'desc' | null;
}

const sortOptions: SortOption[] = [
  { label: 'No option', sortBy: null, sortOrder: null },
  { label: 'Highest rated', sortBy: 'averageRating', sortOrder: 'desc' },
  { label: 'Lowest rated', sortBy: 'averageRating', sortOrder: 'asc' },
  { label: 'Price: Low to High', sortBy: 'pricePerNight', sortOrder: 'asc' },
  { label: 'Price: High to Low', sortBy: 'pricePerNight', sortOrder: 'desc' },
];

const SortBySection = memo(
  ({ onSortChange }: { onSortChange: (sortBy: string | null, sortOrder: 'asc' | 'desc' | null) => void }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
    const isFilterMenuOpen = Boolean(anchorEl);

    const handleOpenFilter = useCallback((event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }, []);

    const handleCloseFilter = useCallback(() => {
      setAnchorEl(null);
    }, []);

    const handleSortSelect = useCallback(
      (option: SortOption) => {
        setSelectedSort(option);
        onSortChange(option.sortBy, option.sortOrder);
        handleCloseFilter();
      },
      [onSortChange, handleCloseFilter],
    );

    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, py: 1 }}>
          Sort by
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: 'white.50',
              borderRadius: 100,
              borderColor: isFilterMenuOpen ? 'black.500' : 'black.100',
              ':hover': { backgroundColor: 'white.50' },
            }}
            onClick={handleOpenFilter}
            disableTouchRipple
          >
            <Typography variant="body2" sx={{ textTransform: 'none', fontWeight: 500, color: 'black.500' }}>
              {selectedSort.label}
            </Typography>
            <ExpandMoreRounded
              sx={{
                color: 'black.500',
                transition: 'transform 0.2s ease-in-out',
                transform: isFilterMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isFilterMenuOpen}
            onClose={handleCloseFilter}
            PaperProps={{ sx: { borderRadius: 2 } }}
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={option.label}
                selected={option.label === selectedSort.label}
                onClick={() => handleSortSelect(option)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    );
  },
);

const DateSection = memo(
  ({
    checkInDate,
    checkOutDate,
    onCheckInDateChange,
    onCheckOutDateChange,
  }: {
    checkInDate: Dayjs | null;
    checkOutDate: Dayjs | null;
    onCheckInDateChange: (date: Dayjs | null) => void;
    onCheckOutDateChange: (date: Dayjs | null) => void;
  }) => {
    return (
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            px: 2,
            py: 1,
            border: 1,
            borderColor: 'black.100',
            borderRadius: '16px 0 0 16px',
          }}
        >
          <Typography variant="caption" sx={{ color: 'black.500', fontSize: 12, fontWeight: 600 }}>
            CHECK-IN
          </Typography>
          <DatePicker
            label="Check-in"
            value={checkInDate}
            onChange={onCheckInDateChange}
            minDate={dayjs()}
            format="DD/MM/YYYY"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: 14,
                fontWeight: 500,
                p: 0,
              },
            }}
            slotProps={{
              field: {
                clearable: true,
              },
              textField: {
                size: 'small',
                variant: 'standard',
                InputProps: {
                  disableUnderline: true,
                },
                label: null,
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            px: 2,
            py: 1,
            border: 1,
            borderColor: 'black.100',
            borderRadius: '0 16px 16px 0',
            borderLeft: 0,
          }}
        >
          <Typography variant="caption" sx={{ color: 'black.500', fontSize: 12, fontWeight: 600 }}>
            CHECKOUT
          </Typography>
          <DatePicker
            label="Checkout"
            value={checkOutDate}
            onChange={onCheckOutDateChange}
            minDate={checkInDate ? checkInDate.add(1, 'day') : dayjs().add(1, 'day')}
            format="DD/MM/YYYY"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: 14,
                fontWeight: 500,
                p: 0,
              },
            }}
            slotProps={{
              field: {
                clearable: true,
              },
              textField: {
                size: 'small',
                variant: 'standard',
                InputProps: {
                  disableUnderline: true,
                },
                label: null,
              },
            }}
          />
        </Grid>
      </Grid>
    );
  },
);

interface GuestCount {
  adults: number;
  children: number;
}

const GuestsSection = memo(
  ({ guestCount, onGuestChange }: { guestCount: GuestCount; onGuestChange: (guestCount: GuestCount) => void }) => {
    const handleGuestCountChange = useCallback(
      (type: 'adults' | 'children', change: number) => {
        onGuestChange({ ...guestCount, [type]: Math.max(0, guestCount[type] + change) });
      },
      [guestCount, onGuestChange],
    );

    return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, py: 1 }}>
          Guests
        </Typography>
        {['adults', 'children'].map((type) => (
          <Box key={type} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 400, color: 'black.500' }}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
              <IconButton
                size="small"
                sx={{
                  border: 1,
                  borderColor: 'black.100',
                  opacity: guestCount[type as 'adults' | 'children'] === 0 ? 0.2 : 1,
                }}
                onClick={() => handleGuestCountChange(type as 'adults' | 'children', -1)}
                disabled={guestCount[type as 'adults' | 'children'] === 0}
              >
                <RemoveRounded sx={{ color: 'black.500' }} />
              </IconButton>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: 'black.500',
                  width: {
                    xs: 30,
                    sm: 40,
                    md: 50,
                  },
                  textAlign: 'center',
                }}
              >
                {guestCount[type as 'adults' | 'children']}
              </Typography>
              <IconButton
                size="small"
                sx={{ border: 1, borderColor: 'black.100' }}
                onClick={() => handleGuestCountChange(type as 'adults' | 'children', 1)}
              >
                <AddRounded sx={{ color: 'black.500' }} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    );
  },
);

const RoomsAndBedsSection = memo(
  ({
    selectedRooms,
    onRoomsChange,
  }: {
    selectedRooms: { bedrooms: number; beds: number; bathrooms: number };
    onRoomsChange: (rooms: { bedrooms: number; beds: number; bathrooms: number }) => void;
  }) => {
    const handleRoomChange = useCallback(
      (type: 'bedrooms' | 'beds' | 'bathrooms', change: number) => {
        onRoomsChange({ ...selectedRooms, [type]: Math.max(0, selectedRooms[type] + change) });
      },
      [selectedRooms, onRoomsChange],
    );

    return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, py: 1 }}>
          Rooms and beds
        </Typography>
        {['bedrooms', 'beds', 'bathrooms'].map((type) => (
          <Box key={type} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 400, color: 'black.500' }}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
              <IconButton
                size="small"
                sx={{ border: 1, borderColor: 'black.100' }}
                onClick={() => handleRoomChange(type as 'bedrooms' | 'beds' | 'bathrooms', -1)}
                disabled={selectedRooms[type as 'bedrooms' | 'beds' | 'bathrooms'] === 0}
              >
                <RemoveRounded sx={{ color: 'black.500' }} />
              </IconButton>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: 'black.500',
                  width: {
                    xs: 30,
                    sm: 40,
                    md: 50,
                  },
                  textAlign: 'center',
                }}
              >
                {selectedRooms[type as 'bedrooms' | 'beds' | 'bathrooms'] || 'Any'}
              </Typography>
              <IconButton
                size="small"
                sx={{ border: 1, borderColor: 'black.100' }}
                onClick={() => handleRoomChange(type as 'bedrooms' | 'beds' | 'bathrooms', 1)}
              >
                <AddRounded sx={{ color: 'black.500' }} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    );
  },
);

const MemoizedAmenityItem = memo(AmenityItem);

// Optimized and Memoized AmenitiesSection
const AmenitiesSection = memo(
  ({
    selectedAmenities,
    onAmenitySelect,
  }: {
    selectedAmenities: string[];
    onAmenitySelect: (amenityKey: string) => void;
  }) => {
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, py: 1 }}>
          Amenities
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: isSmallScreen ? 'nowrap' : 'wrap',
            gap: 2,
            overflowX: isSmallScreen ? 'auto' : 'hidden',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {Object.entries(amenities).map(([key, value]) => (
            <Box
              key={key}
              onClick={() => onAmenitySelect(key)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: 2,
                py: 1.5,
                px: 2,
                borderRadius: 10,
                borderColor: selectedAmenities.includes(key) ? 'black.900' : 'black.100',
                backgroundColor: selectedAmenities.includes(key) ? 'gray.50' : 'transparent',
                transition: 'all 0.3s',
                ':hover': {
                  borderColor: 'black.900',
                  backgroundColor: 'gray.50',
                },
                ':active': {
                  transform: 'scale(0.9)',
                },
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <MemoizedAmenityItem icon={value.icon} title={value.title} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  },
);

const FilterDialog = ({ open, onClose, onApply }: FilterDialogProps) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [selectedRooms, setSelectedRooms] = useState({ bedrooms: 0, beds: 0, bathrooms: 0 });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState<GuestCount>({ adults: 0, children: 0 });
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(dayjs());
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(dayjs().add(7, 'day'));

  const handleSortChange = useCallback((newSortBy: string | null, newSortOrder: 'asc' | 'desc' | null) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  }, []);

  const handleRoomsChange = useCallback((rooms: { bedrooms: number; beds: number; bathrooms: number }) => {
    setSelectedRooms(rooms);
  }, []);

  const handleAmenitySelect = useCallback((amenityKey: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityKey) ? prev.filter((a) => a !== amenityKey) : [...prev, amenityKey],
    );
  }, []);

  const handleClearAll = useCallback(() => {
    setSortBy(null);
    setSortOrder(null);
    setSelectedRooms({ bedrooms: 0, beds: 0, bathrooms: 0 });
    setSelectedAmenities([]);
    setGuestCount({ adults: 0, children: 0 });
    setCheckInDate(null);
    setCheckOutDate(null);
  }, []);

  const handleApply = useCallback(() => {
    onApply(
      sortBy,
      sortOrder,
      selectedRooms,
      selectedAmenities,
      { checkInDate: checkInDate ? checkInDate.toDate() : null, checkOutDate: checkOutDate ? checkOutDate.toDate() : null },
      guestCount,
    );
    onClose();
  }, [sortBy, sortOrder, selectedRooms, selectedAmenities, checkInDate, checkOutDate, guestCount, onApply, onClose]);

  const handleGuestChange = useCallback((guestCount: GuestCount) => {
    setGuestCount(guestCount);
  }, []);

  const handleCheckInDateChange = useCallback(
    (date: Dayjs | null) => {
      setCheckInDate(date);
      if (date && checkOutDate && date.isAfter(checkOutDate, 'day')) {
        setCheckOutDate(date.add(1, 'day'));
      }
    },
    [checkOutDate],
  );

  const handleCheckOutDateChange = useCallback(
    (date: Dayjs | null) => {
      setCheckOutDate(date);
      if (date && checkInDate && date.isBefore(checkInDate, 'day')) {
        setCheckInDate(date.subtract(1, 'day'));
      }
    },
    [checkInDate],
  );

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
          >
            <Typography variant="body2" sx={{ color: 'white.50', fontWeight: 600, fontSize: 14, textTransform: 'none' }}>
              Apply
            </Typography>
          </Button>
        </Container>
      }
    >
      <SortBySection onSortChange={handleSortChange} />
      <Divider sx={{ my: 2 }} />
      <DateSection
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        onCheckInDateChange={handleCheckInDateChange}
        onCheckOutDateChange={handleCheckOutDateChange}
      />
      <Divider sx={{ my: 2 }} />
      <GuestsSection guestCount={guestCount} onGuestChange={handleGuestChange} />
      <Divider sx={{ my: 2 }} />
      <RoomsAndBedsSection selectedRooms={selectedRooms} onRoomsChange={handleRoomsChange} />
      <Divider sx={{ my: 2 }} />
      <AmenitiesSection selectedAmenities={selectedAmenities} onAmenitySelect={handleAmenitySelect} />
    </CustomDialog>
  );
};

export default FilterDialog;

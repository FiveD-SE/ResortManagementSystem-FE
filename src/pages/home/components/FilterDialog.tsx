import CustomDialog from '../../../components/CustomDialog';
import { Box, Button, Container, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { AddRounded, ExpandMoreRounded, RemoveRounded } from '@mui/icons-material';
import AmenityItem from '../../rooms/components/AmenitiyItem';
import { amenities } from '../../../constants/amenities';
import { useState } from 'react';

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
}

const FilterOptions1 = () => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsFilterMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setIsFilterMenuOpen(false);
    setAnchorEl(null);
  };
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
            Most recent
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
          <MenuItem>Most recent</MenuItem>
          <MenuItem>Highest rated</MenuItem>
          <MenuItem>Lowest rated</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

const FilterOptions2 = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, py: 1 }}>
        Rooms and beds
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 400, color: 'black.500' }}>
            Bedrooms
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <IconButton size="small" sx={{ border: 1, borderColor: 'black.100' }}>
            <RemoveRounded sx={{ color: 'black.500' }} />
          </IconButton>
          <Typography variant="body1" sx={{ fontWeight: 500, color: 'black.500', px: 3 }}>
            Any
          </Typography>
          <IconButton size="small" sx={{ border: 1, borderColor: 'black.100' }}>
            <AddRounded sx={{ color: 'black.500' }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 400, color: 'black.500' }}>
            Beds
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <IconButton size="small" sx={{ border: 1, borderColor: 'black.100' }}>
            <RemoveRounded sx={{ color: 'black.500' }} />
          </IconButton>
          <Typography variant="body1" sx={{ fontWeight: 500, color: 'black.500', px: 3 }}>
            Any
          </Typography>
          <IconButton size="small" sx={{ border: 1, borderColor: 'black.100' }}>
            <AddRounded sx={{ color: 'black.500' }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, py: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 400, color: 'black.500' }}>
            Bathrooms
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          <IconButton size="small" sx={{ border: 1, borderColor: 'black.100' }}>
            <RemoveRounded sx={{ color: 'black.500' }} />
          </IconButton>
          <Typography variant="body1" sx={{ fontWeight: 500, color: 'black.500', px: 3 }}>
            Any
          </Typography>
          <IconButton size="small" sx={{ border: 1, borderColor: 'black.100' }}>
            <AddRounded sx={{ color: 'black.500' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const FilterOptions3 = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, py: 1 }}>
        Amenities
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {Object.entries(amenities).map(([key, value]) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              key={key}
              sx={{
                border: 2,
                py: 1.5,
                px: 2,
                borderRadius: 10,
                borderColor: 'black.100',
                transition: 'all 0.3s',
                ':hover': {
                  borderColor: 'black.900',
                  backgroundColor: 'gray.50',
                },
                ':active': {
                  transform: 'scale(0.9)',
                },
                cursor: 'pointer',
              }}
            >
              <AmenityItem icon={value.icon} title={value.title} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const actions = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 2 }}>
      <Button
        variant="text"
        sx={{
          px: 3,
          py: 2,
          borderRadius: 3,
          color: 'black.500',
          transition: 'all 0.3s',
          ':hover': {
            backgroundColor: 'gray.50',
          },
          ':active': {
            transform: 'scale(0.9)',
          },
        }}
        disableTouchRipple
      >
        <Typography variant="body2" sx={{ color: 'black.500', fontWeight: 600, fontSize: 14, textTransform: 'none' }}>
          Clear all
        </Typography>
      </Button>
      <Button
        variant="contained"
        sx={{
          px: 3,
          py: 2,
          borderRadius: 3,
          backgroundColor: 'black.500',
          transition: 'all 0.3s',
          color: 'white.50',
          ':active': {
            transform: 'scale(0.9)',
          },
        }}
        disableElevation
      >
        <Typography variant="body2" sx={{ color: 'white.50', fontWeight: 600, fontSize: 14, textTransform: 'none' }}>
          Apply
        </Typography>
      </Button>
    </Container>
  );
};

const FilterDialog = ({ open, onClose }: FilterDialogProps) => {
  return (
    <CustomDialog open={open} onClose={onClose} actions={actions()}>
      {FilterOptions1()}
      <Divider sx={{ my: 2 }} />
      {FilterOptions2()}
      <Divider sx={{ my: 2 }} />
      {FilterOptions3()}
    </CustomDialog>
  );
};

export default FilterDialog;

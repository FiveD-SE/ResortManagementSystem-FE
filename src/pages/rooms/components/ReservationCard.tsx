import { ExpandMoreRounded, StarRounded } from '@mui/icons-material';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import GuestDropdownMenu from './GuestDropdownMenu';

interface HandleClickEvent {
  currentTarget: EventTarget & HTMLDivElement;
}

const ReservationCard = () => {
  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: HandleClickEvent) => {
    setIsGuestMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsGuestMenuOpen(false);
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 2.5,
        position: 'sticky',
        top: '16px',
        backgroundColor: 'white.50',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 424.5,
          gap: 2,
          px: 2.5,
          py: 3,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" sx={{ color: 'gray.500', textDecoration: 'line-through' }}>
              $500
            </Typography>
            <Typography variant="h4" sx={{ color: 'black.500' }}>
              $440
            </Typography>
            <Typography variant="body1" sx={{ color: 'black.500' }}>
              night
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StarRounded sx={{ fontSize: 14, color: 'black.500' }} />
            <Typography variant="body1" sx={{ color: 'black.500' }}>
              4.99
            </Typography>
            •
            <Typography variant="body1" sx={{ color: 'black.500' }}>
              337 reviews
            </Typography>
          </Box>
        </Box>
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
              borderRadius: '16px 0 0 0',
            }}
          >
            <Typography variant="caption" sx={{ color: 'black.500', fontSize: 10, fontWeight: 600 }}>
              CHECK-IN
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              2/6/2023
            </Typography>
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
              borderRadius: '0 16px 0 0',
              borderLeft: 0,
            }}
          >
            <Typography variant="caption" sx={{ color: 'black.500', fontSize: 10, fontWeight: 600 }}>
              CHECKOUT
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              2/11/2023
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              border: 1,
              borderColor: 'black.100',
              borderRadius: '0 0 16px 16px',
              borderTop: 0,
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            <Box>
              <Typography variant="caption" sx={{ color: 'black.500', fontSize: 10, fontWeight: 600 }}>
                GUESTS
              </Typography>
              <Typography variant="body2" sx={{ color: 'black.500' }}>
                2 guests
              </Typography>
            </Box>
            <IconButton>
              <ExpandMoreRounded />
            </IconButton>
          </Grid>
          <GuestDropdownMenu anchorEl={anchorEl} open={isGuestMenuOpen} onClose={handleClose} />
        </Grid>
        <Button
          variant="contained"
          sx={{
            width: '100%',
            py: 2,
            backgroundColor: 'primary.500',
            borderRadius: 3,
          }}
        >
          <Typography sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }}>Reserve</Typography>
        </Button>
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'black.400' }}>
          You won't be charged yet
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            500 x 5 nights
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            $2,500
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            Long stay discount
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            -$300
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            Cleaning fee
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            $200
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            Service fee
          </Typography>
          <Typography variant="body2" sx={{ color: 'black.500' }}>
            $0
          </Typography>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontSize: 16, color: 'black.500', fontWeight: 700 }}>
            Total
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 16, color: 'black.500', fontWeight: 700 }}>
            $0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReservationCard;

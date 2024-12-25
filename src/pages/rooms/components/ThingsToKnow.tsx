import { ChevronRightRounded } from '@mui/icons-material';
import { Box, Grid, Link, Typography } from '@mui/material';

const ThingsToKnow = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 3,
        px: 0,
        py: 3,
        borderTop: 1,
        borderColor: 'black.50',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
        <Typography variant="h5" component="div" sx={{ width: '100%', fontWeight: 600, color: 'black.500' }}>
          Things to know
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'black.500' }}>
              House rules
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              Checkout before 12:00 PM
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              8 guests maximum
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              No pets
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', pt: 3 }}>
              <Link href="#" underline="hover" sx={{ color: 'black.500', fontWeight: 500 }}>
                Show more
              </Link>
              <ChevronRightRounded />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'black.500' }}>
              House rules
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              Checkout before 12:00 PM
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              8 guests maximum
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              No pets
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', pt: 3 }}>
              <Link href="#" underline="hover" sx={{ color: 'black.500', fontWeight: 500 }}>
                Show more
              </Link>
              <ChevronRightRounded />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'black.500' }}>
              House rules
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              Checkout before 12:00 PM
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              8 guests maximum
            </Typography>
            <Typography variant="body2" sx={{ color: 'black.500' }}>
              No pets
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', pt: 3 }}>
              <Link href="#" underline="hover" sx={{ color: 'black.500', fontWeight: 500 }}>
                Show more
              </Link>
              <ChevronRightRounded />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThingsToKnow;

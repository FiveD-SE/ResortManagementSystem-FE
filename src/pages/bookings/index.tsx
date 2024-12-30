import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Header from './components/Header';
// import TripDetails from './components/TripDetails';
import Payment from './components/Payment';
import Voucher from './components/Voucher';
import AddsOnService from './components/AddsOnService';
import PricingDetailCard from './components/PricingDetailCard';

const Bookings = () => {
  return (
    <Container>
      <Header />
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            {/* <TripDetails /> */} {/* Commented out to prevent error and will be implement tomorrow 31/12/2024 */}
            <Payment />
            <Voucher />
            <AddsOnService />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                pb: 2,
                justifyContent: 'center',
                gap: 2,
                pt: 2,
                borderTop: 1,
                borderColor: 'black.50',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: 'fit-content',
                  py: 2,
                  px: 4,
                  backgroundColor: 'primary.500',
                  borderRadius: 3,
                }}
              >
                <Typography sx={{ textTransform: 'none', fontSize: 16, fontWeight: 600 }}>Request to book</Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <PricingDetailCard />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Bookings;

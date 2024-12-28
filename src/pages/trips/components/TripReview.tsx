import { Box, Divider, Stack, TextField, Typography } from '@mui/material';
import Header from './Header';
import Grid from '@mui/material/Grid2';
import PricingCard from './Detail/PricingCard';
import RatingItem from './Detail/RatingItem';
import { TRIPS_FORM } from '../constant';

const rating = [
  {
    title: 'Cleanliness',
    value: 3,
  },
  {
    title: 'Accuracy',
    value: 4.5,
  },
  {
    title: 'Check-in',
    value: 5,
  },
  {
    title: 'Communication',
    value: 3.5,
  },
  {
    title: 'Location',
    value: 4,
  },
  {
    title: 'Value',
    value: 4.5,
  },
];

const TripReview = () => {
  return (
    <Stack sx={{ padding: 8, width: '100%' }} spacing={4}>
      <Header haveBackNav={true} title="Review" />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid size={6}>
            <PricingCard />
          </Grid>
          <Grid container size={6} sx={{ padding: 4 }}>
            {rating.map((item, index) => (
              <Grid key={index} size={6}>
                <RatingItem title={item.title} value={item.value} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Stack gap={4}>
        <Box>
          <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro', mb: 1 }}>
            {TRIPS_FORM.COMMENT.TITLE}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'Be Vietnam Pro' }}>
            {TRIPS_FORM.COMMENT.CONTENT}
          </Typography>
        </Box>

        <TextField variant="outlined" multiline minRows={5} color="info" sx={{ width: '100%' }} />
      </Stack>
    </Stack>
  );
};

export default TripReview;

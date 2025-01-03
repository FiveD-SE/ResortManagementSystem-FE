import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import Header from './Header';
import Grid from '@mui/material/Grid2';
import PricingCard from './Detail/PricingCard';
import RatingItem from './Detail/RatingItem';
import { TRIPS_FORM } from '../constant';
import { useParams } from 'react-router-dom';
import { useGetBookingByIdQuery } from '../../../apis/bookingApi';
import { useRatingRoomMutation } from '../../../apis/roomApi';
import React from 'react';

interface Rating {
  title: string;
  value: number | null;
}

const initialRatings: Rating[] = [
  { title: 'Cleanliness', value: 0 as number },
  { title: 'Comfort', value: 0 as number },
  { title: 'Location', value: 0 as number },
  { title: 'Facilities', value: 0 as number },
  { title: 'Staff', value: 0 as number },
  { title: 'Value for money', value: 0 as number },
];

const TripReview = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetBookingByIdQuery(id || '');
  const [rateRoom] = useRatingRoomMutation();

  const [comment, setComment] = React.useState<string>('');
  const [rating, setRating] = React.useState<Rating[]>(initialRatings);
  const submitReview = () => {
    const ratings = {
      cleanliness: rating[0].value ?? 0,
      accuracy: rating[1].value ?? 0,
      checkIn: rating[2].value ?? 0,
      communication: rating[3].value ?? 0,
      location: rating[4].value ?? 0,
      value: rating[5].value ?? 0,
    };
    rateRoom({ roomId: data?.roomId.id || '', ...ratings, comment });
    window.location.href = '/';
  };
  React.useEffect(() => {
    console.log(rating);
    console.log(comment);
  }, [rating, comment]);
  return (
    <Box sx={{ padding: 8, width: '100%' }}>
      <Stack gap={4}>
        <Header haveBackNav={true} title="Review" />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid size={6}>
              <PricingCard data={data || null} />
            </Grid>
            <Grid container size={6} sx={{ padding: 4 }}>
              {rating.map((item, index) => (
                <Grid key={index} size={6}>
                  <RatingItem title={item.title} value={item.value ?? 0} onChange={setRating} />
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

          <TextField
            variant="outlined"
            multiline
            minRows={5}
            color="info"
            sx={{ width: '100%' }}
            onChange={(e) => setComment(e.target.value)}
          />
        </Stack>
      </Stack>
      <Button
        variant="contained"
        sx={{ mt: 4, p: 2, textTransform: 'none', width: '10%', borderRadius: 3, backgroundColor: '#C72D65' }}
      >
        <Typography variant="h3" sx={{ fontFamily: 'Be Vietnam Pro' }} onClick={() => submitReview()}>
          Review
        </Typography>
      </Button>
    </Box>
  );
};

export default TripReview;

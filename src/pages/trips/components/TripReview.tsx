import { Box, Button, Container, Divider, Stack, TextField, Typography } from '@mui/material';
import Header from './Header';
import Grid from '@mui/material/Grid2';
import PricingCard from './Detail/PricingCard';
import RatingItem from './Detail/RatingItem';
import { TRIPS_FORM } from '../constant';
import { useParams } from 'react-router-dom';
import { useGetBookingByIdQuery } from '../../../apis/bookingApi';
import { useRatingRoomMutation } from '../../../apis/roomApi';
import React from 'react';
import { CardLoading } from './Skeleton';

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

  return (
    <Container>
      <Stack gap={4}>
        <Header title="Review" />
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{
              xs: 2,
              sm: 6,
            }}
          >
            <Grid size={{ xs: 12, sm: 6 }}>{isFetching ? <CardLoading /> : <PricingCard data={data || null} />}</Grid>
            <Grid container size={{ xs: 12, sm: 6 }}>
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
            maxRows={5}
            color="info"
            sx={{ width: '100%' }}
            onChange={(e) => setComment(e.target.value)}
          />
        </Stack>
      </Stack>
      <Box sx={{ pb: 2 }}>
        <Button
          variant="contained"
          sx={{
            mt: 4,
            py: 1.5,
            px: 3,
            textTransform: 'none',
            width: 'fit-content',
            borderRadius: 3,
            backgroundColor: 'primary.500',
          }}
        >
          <Typography variant="h6" onClick={() => submitReview()}>
            Leave your review
          </Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default TripReview;

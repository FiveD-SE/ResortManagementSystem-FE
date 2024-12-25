import { StarRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

const reviews = [
  {
    name: 'Hanna',
    date: 'January 2023',
    stars: 5,
    timeAgo: '2 days ago',
    review:
      'This place was amazing! I loved the location and the amenities. The host was very responsive and helpful. I would definitely stay here again.',
  },
  {
    name: 'Hanna',
    date: 'January 2023',
    stars: 5,
    timeAgo: '2 days ago',
    review:
      'This place was amazing! I loved the location and the amenities. The host was very responsive and helpful. I would definitely stay here again.',
  },
  {
    name: 'Hanna',
    date: 'January 2023',
    stars: 5,
    timeAgo: '2 days ago',
    review:
      'This place was amazing! I loved the location and the amenities. The host was very responsive and helpful. I would definitely stay here again.',
  },
  {
    name: 'Hanna',
    date: 'January 2023',
    stars: 5,
    timeAgo: '2 days ago',
    review:
      'This place was amazing! I loved the location and the amenities. The host was very responsive and helpful. I would definitely stay here again.',
  },
  {
    name: 'Hanna',
    date: 'January 2023',
    stars: 5,
    timeAgo: '2 days ago',
    review:
      'This place was amazing! I loved the location and the amenities. The host was very responsive and helpful. I would definitely stay here again.',
  },
];

const GuestReviews = () => {
  return (
    <Box sx={{ borderTop: 1, borderColor: 'black.50', py: 5 }}>
      <Grid container spacing={6}>
        {reviews.map((review, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar sx={{ backgroundColor: 'gray.300', width: 40, height: 40 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {review.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black.400' }}>
                    {review.date}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {[...Array(review.stars)].map((_, index) => (
                  <StarRounded key={index} />
                ))}
                <Typography variant="body2" sx={{ color: 'black.500' }}>
                  •
                </Typography>
                <Typography variant="body2" sx={{ color: 'black.500' }}>
                  {review.timeAgo}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'black.500' }}>
                {review.review}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 6 }}>
        <Button
          variant="outlined"
          sx={{
            px: 3,
            py: 1,
            borderRadius: 3,
            backgroundColor: 'white.50',
            borderColor: 'black.500',
            color: 'black.500',
            border: '1px solid',
            ':hover': {
              backgroundColor: 'gray.50',
            },
          }}
        >
          <Typography sx={{ fontSize: 14, textTransform: 'none', fontWeight: 500 }}>Show all 20 reviews</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default GuestReviews;

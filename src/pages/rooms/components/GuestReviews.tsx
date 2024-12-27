import { StarRounded, SvgIconComponent } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import GuestReviewsDialog from './GuestReviewsDialog';
import { useState } from 'react';

const reviews: { avatar?: string; name: string; location: string; stars: number; date: string; review: string }[] = [
  {
    name: 'Tamara',
    location: 'Skopje, North Macedonia',
    date: 'November 2024',
    stars: 5,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    review:
      'The hosts were very helpful and friendly. They gave us recommendations for local food, rented scooters to us and arranged our transport from Hue to Hoi An. The house is really cozy with a a very nice, green yard. Their 2 little dogs are cute and friendly.',
  },
  {
    name: 'Monir',
    location: '9 years on Airbnb',
    date: 'May 2024',
    stars: 4,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    review: 'Great location and host. Very helpful, very nice space and environment.',
  },
  {
    name: '怡宁',
    location: '8 years on Airbnb',
    date: 'May 2024',
    stars: 4,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    review: 'Very great place to stay well into Hue culture \n Translated from Chinese (Simplified) Show original', // Consider handling translation in your component
  },
  {
    name: 'Belén',
    location: '6 years on Airbnb',
    date: 'April 2024',
    stars: 5,
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    review: 'The room was quite nice and clean. Linh was very kind',
  },
  {
    name: 'Ashley',
    location: '3 years on Airbnb',
    date: 'April 2024',
    stars: 3,
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    review: 'This is placeholder review from Ashley',
  },
];

interface GuestReviewsProps {
  overallRatings: { label: string; value: number }[];
  detailedRatings: { label: string; value: number; icon: SvgIconComponent }[];
  averageRating: number;
  totalReviews: number;
}

const GuestReviews = ({ overallRatings, detailedRatings, averageRating, totalReviews }: GuestReviewsProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
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
                  {review.date}
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
          onClick={handleOpenDialog}
        >
          <Typography sx={{ fontSize: 14, textTransform: 'none', fontWeight: 500 }}>
            Show all {reviews.length} reviews
          </Typography>
        </Button>
      </Box>
      <GuestReviewsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        reviews={reviews}
        overallRatings={overallRatings}
        detailedRatings={detailedRatings}
        averageRating={averageRating}
        totalReviews={totalReviews}
      />
    </Box>
  );
};

export default GuestReviews;

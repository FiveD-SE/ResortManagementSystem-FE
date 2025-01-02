import { StarRounded, SvgIconComponent } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import GuestReviewsDialog from './GuestReviewsDialog';
import { useState } from 'react';
import { IRating } from '../../../types/rating';

interface GuestReviewsProps {
  overallRatings: { label: string; value: number }[];
  detailedRatings: { label: string; value: number; icon: SvgIconComponent }[];
  averageRating: number;
  totalReviews: number;
  ratings: IRating[];
}

const GuestReviews = ({ overallRatings, detailedRatings, averageRating, totalReviews, ratings }: GuestReviewsProps) => {
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
        {ratings.slice(0, 6).map((rating, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar sx={{ backgroundColor: 'gray.300', width: 40, height: 40 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {rating.fullName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {new Date(rating.createdAt).toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {[...Array(5)].map((_, starIndex) => (
                  <StarRounded key={starIndex} sx={{ color: starIndex + 1 <= rating.average ? 'black.500' : 'gray.200' }} />
                ))}
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  •
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {new Date(rating.createdAt).toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {rating.comment}
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
            Show all {ratings.length} reviews
          </Typography>
        </Button>
      </Box>
      <GuestReviewsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        ratings={ratings}
        overallRatings={overallRatings}
        detailedRatings={detailedRatings}
        averageRating={averageRating}
        totalReviews={totalReviews}
      />
    </Box>
  );
};

export default GuestReviews;

import { FavoriteBorderRounded, ShareRounded, StarRounded } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { IReview, IRoomType } from '../../../types';

interface IRoomOverviewProps {
  roomType: Pick<IRoomType, 'typeName' | 'guestAmount' | 'bedroomAmount' | 'bedAmount' | 'sharedBathAmount'>;
  reviews: Pick<IReview, 'rating' | 'createdAt'>[];
}

const RoomOverview = ({ roomType, reviews }: IRoomOverviewProps) => {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: 'black.500' }}>
        {roomType.typeName}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" sx={{ color: 'black.500' }}>
          {roomType.guestAmount} guests • {roomType.bedroomAmount} bedroom • {roomType.bedAmount} beds •{' '}
          {roomType.sharedBathAmount} shared baths
        </Typography>
        <Stack direction="row" sx={{ alignItems: 'center', mt: 1 }} spacing={1}>
          <StarRounded sx={{ fontSize: 14, color: 'black.500' }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'black.500' }}>
            {reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'black.500', textDecoration: 'underline' }}>
            {reviews.length} reviews
          </Typography>
        </Stack>
      </Box>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <IconButton>
            <ShareRounded sx={{ fontSize: 24, color: 'black.500' }} />
          </IconButton>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'black.500' }}>
            Share
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <IconButton>
            <FavoriteBorderRounded sx={{ fontSize: 24, color: 'black.500' }} />
          </IconButton>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'black.500' }}>
            Save
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RoomOverview;

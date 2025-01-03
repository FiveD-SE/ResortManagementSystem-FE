import { StarRounded } from '@mui/icons-material';
import { Box, Link, Stack, Typography } from '@mui/material';
import { IRoomType } from '../../../types';
import { IRating } from '../../../types/rating';

interface IRoomOverviewProps {
  roomType: Pick<
    IRoomType,
    'typeName' | 'guestAmount' | 'bedroomAmount' | 'bedAmount' | 'sharedBathAmount' | 'amenities' | 'keyFeatures'
  >;
  ratings: Pick<IRating, 'average'>[];
  ratingsRef?: React.RefObject<HTMLDivElement>;
}

const RoomOverview = ({ roomType, ratings, ratingsRef }: IRoomOverviewProps) => {
  const scrollToGuestReviews = () => {
    ratingsRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };
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
            {(ratings.reduce((acc, rating) => acc + rating.average, 0) / ratings.length).toFixed(1) || 0}
          </Typography>
          <Link onClick={scrollToGuestReviews}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'black.500', textDecoration: 'underline' }}>
              {ratings.length} {ratings.length > 1 ? 'reviews' : 'review'}
            </Typography>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default RoomOverview;

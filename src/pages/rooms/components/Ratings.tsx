import { Box, Divider, Typography, useMediaQuery } from '@mui/material';
import RatingProgress from './RatingProgress';
import RatingItem from './RatingItem';
import { StarRounded, SvgIconComponent } from '@mui/icons-material';

interface RatingsProps {
  detailedRatings: { label: string; value: number; icon: SvgIconComponent }[];
  averageScores: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
  ratingCounts: {
    oneStar: number;
    twoStars: number;
    threeStars: number;
    fourStars: number;
    fiveStars: number;
  };
  averageRating: number;
  ratingCount: number;
}

const Ratings = ({ detailedRatings, ratingCounts, averageRating, ratingCount }: RatingsProps) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 4,
        px: 0,
        py: 4,
        borderTop: 1,
        borderColor: 'black.50',
        mt: 4,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <StarRounded sx={{ mr: 1 }} />
          {averageRating.toFixed(1)} ({ratingCount} {ratingCount === 1 ? 'review' : 'reviews'})
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: 3,
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h6">Overall rating</Typography>
          <RatingProgress value={(ratingCounts.fiveStars / ratingCount) * 5 || 0} label={'5'} />
          <RatingProgress value={(ratingCounts.fourStars / ratingCount) * 5 || 0} label={'4'} />
          <RatingProgress value={(ratingCounts.threeStars / ratingCount) * 5 || 0} label={'3'} />
          <RatingProgress value={(ratingCounts.twoStars / ratingCount) * 5 || 0} label={'2'} />
          <RatingProgress value={(ratingCounts.oneStar / ratingCount) * 5 || 0} label={'1'} />
        </Box>

        <Box
          sx={{
            flex: isSmallScreen ? 'none' : 3,
            display: 'flex',
            alignItems: 'center',
            overflowX: isSmallScreen ? 'auto' : 'hidden',
            gap: 2,
            width: isSmallScreen ? '100%' : 'auto',
            '&::-webkit-scrollbar': {
              height: 2,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'gray.400',
              borderRadius: 10,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'red',
            },
          }}
        >
          {detailedRatings.map((rating, index) => (
            <Box sx={{ display: 'flex', pb: 1, gap: 2 }} key={index}>
              <RatingItem
                key={index}
                label={rating.label}
                value={rating.value}
                icon={rating.icon}
                orientation={isSmallScreen ? 'horizontal' : 'vertical'}
              />
              {index < detailedRatings.length - 1 && <Divider orientation="vertical" flexItem />}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Ratings;

import { Box, Divider, Typography } from '@mui/material';
import RatingProgress from './RatingProgress';
import RatingItem from './RatingItem';
import { Fragment } from 'react/jsx-runtime';
import { StarRounded, SvgIconComponent } from '@mui/icons-material';

interface RatingsProps {
  detailedRatings: { label: string; value: number; icon: SvgIconComponent }[];
}

const Ratings = ({ detailedRatings }: RatingsProps) => {
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
        borderColor: 'black.100',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <StarRounded sx={{ mr: 1 }} />
          4.91 (328 reviews)
        </Typography>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="h6">Overall rating</Typography>
          <RatingProgress value={4.8} label={'5'} />
          <RatingProgress value={4.8} label={'4'} />
          <RatingProgress value={4.8} label={'3'} />
          <RatingProgress value={4.8} label={'2'} />
          <RatingProgress value={4.8} label={'1'} />
        </Box>

        {detailedRatings.map((rating, index) => (
          <Fragment>
            {index === 0 && <Divider orientation="vertical" flexItem />}
            <RatingItem key={index} label={rating.label} value={rating.value} icon={rating.icon} />
            {index < detailedRatings.length - 1 && <Divider orientation="vertical" flexItem />}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Ratings;

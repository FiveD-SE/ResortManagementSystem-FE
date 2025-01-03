import { Typography, Box, Divider, Grid, Button, Menu, MenuItem, Avatar } from '@mui/material';
import { ExpandMoreRounded, StarRounded, SvgIconComponent } from '@mui/icons-material';
import RatingProgress from './RatingProgress';
import RatingItem from './RatingItem';
import React, { Fragment, useState } from 'react';
import { IRating } from '../../../types/rating';
import CustomDialog from '../../../components/CustomDialog';

interface GuestReviewsDialogProps {
  open: boolean;
  onClose: () => void;
  ratings: IRating[];
  overallRatings: { label: string; value: number }[];
  detailedRatings: { label: string; value: number; icon: SvgIconComponent }[];
  averageRating: number;
  totalReviews: number;
}

type FilterOption = 'Most recent' | 'Highest rated' | 'Lowest rated';

const GuestReviewsDialog: React.FC<GuestReviewsDialogProps> = ({
  open,
  onClose,
  ratings,
  overallRatings,
  detailedRatings,
  averageRating,
  totalReviews,
}) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('Most recent');
  const handleOpenFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsFilterMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setIsFilterMenuOpen(false);
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter: FilterOption) => {
    setSelectedFilter(filter);
    handleCloseFilter();
  };

  const getFilteredRatings = (filter: FilterOption, ratings: IRating[]) => {
    switch (filter) {
      case 'Most recent':
        return [...ratings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'Highest rated':
        return [...ratings].sort((a, b) => b.average - a.average);
      case 'Lowest rated':
        return [...ratings].sort((a, b) => a.average - b.average);
      default:
        return ratings;
    }
  };

  const filteredRatings = getFilteredRatings(selectedFilter, ratings);

  return (
    <CustomDialog open={open} onClose={onClose}>
      <Grid
        container
        spacing={{
          xs: 1,
          md: 6,
        }}
      >
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StarRounded sx={{ mr: 1, fontSize: 48 }} />
            <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: 48, fontWeight: 600 }}>
              {averageRating.toFixed(1)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
            <Box sx={{ flex: 0.5 }}>
              <Typography variant="h6">Overall rating</Typography>
              {overallRatings.map((rating) => (
                <RatingProgress key={rating.label} value={rating.value} label={rating.label} />
              ))}
            </Box>
            <Box sx={{ flex: 1 }}>
              {detailedRatings.map((rating) => (
                <Fragment>
                  <Box sx={{ py: 2.5 }}>
                    <RatingItem
                      key={rating.label}
                      label={rating.label}
                      value={rating.value}
                      icon={rating.icon}
                      orientation="horizontal"
                    />
                  </Box>
                  <Divider orientation="horizontal" />
                </Fragment>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h2" sx={{ fontWeight: 500 }}>
              {totalReviews} {totalReviews > 1 ? 'reviews' : 'review'}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: 'white.50',
                borderRadius: 100,
                borderColor: isFilterMenuOpen ? 'black.500' : 'black.100',
                ':hover': { backgroundColor: 'white.50' },
              }}
              onClick={handleOpenFilter}
              disableTouchRipple
            >
              <Typography variant="body2" sx={{ textTransform: 'none', fontWeight: 500, color: 'black.500' }}>
                {selectedFilter}
              </Typography>
              <ExpandMoreRounded
                sx={{
                  color: 'black.500',
                  transition: 'transform 0.2s ease-in-out',
                  transform: isFilterMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isFilterMenuOpen}
              onClose={handleCloseFilter}
              PaperProps={{ sx: { borderRadius: 2 } }}
            >
              <MenuItem onClick={() => handleFilterSelect('Most recent')}>Most recent</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('Highest rated')}>Highest rated</MenuItem>
              <MenuItem onClick={() => handleFilterSelect('Lowest rated')}>Lowest rated</MenuItem>
            </Menu>
          </Box>

          <Box sx={{ overflowY: 'auto', maxHeight: 800 }}>
            {filteredRatings.map((rating, index) => (
              <Box key={index} sx={{ mb: 3, overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ backgroundColor: 'gray.300', width: 40, height: 40 }} />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}
                    >
                      {rating.userId}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(rating.createdAt).toLocaleString('default', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ my: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  {[...Array(5)].map((_, starIndex) => (
                    <StarRounded
                      key={starIndex}
                      sx={{
                        fontSize: 16,
                        color: starIndex + 1 <= rating.average ? 'black.500' : 'gray.200',
                      }}
                    />
                  ))}
                  <Typography variant="caption" color="text.secondary">
                    •
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(rating.createdAt).toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Typography>
                </Box>
                <Typography variant="body2">{rating.comment}</Typography>
                {index < ratings.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </CustomDialog>
  );
};

export default GuestReviewsDialog;

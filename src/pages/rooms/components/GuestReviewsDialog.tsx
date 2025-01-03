import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Divider,
  Slide,
  Grid,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { Close, ExpandMoreRounded, StarRounded, SvgIconComponent } from '@mui/icons-material';
import RatingProgress from './RatingProgress';
import RatingItem from './RatingItem';
import { TransitionProps } from '@mui/material/transitions';
import React, { Fragment, useState } from 'react';
import { IRating } from '../../../types/rating';

interface GuestReviewsDialogProps {
  open: boolean;
  onClose: () => void;
  ratings: IRating[];
  overallRatings: { label: string; value: number }[];
  detailedRatings: { label: string; value: number; icon: SvgIconComponent }[];
  averageRating: number;
  totalReviews: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  const handleOpenFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsFilterMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setIsFilterMenuOpen(false);
    setAnchorEl(null);
  };
  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          overflowY: {
            xs: 'auto',
            md: 'hidden',
          },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 4,
          overflowY: {
            xs: 'auto',
            md: 'hidden',
          },
        }}
      >
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
                {totalReviews} reviews
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
                  Most recent
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
                <MenuItem>Most recent</MenuItem>
                <MenuItem>Highest rated</MenuItem>
                <MenuItem>Lowest rated</MenuItem>
              </Menu>
            </Box>

            <Box sx={{ overflowY: 'auto', maxHeight: 800 }}>
              {ratings.map((rating, index) => (
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
      </DialogContent>
    </Dialog>
  );
};

export default GuestReviewsDialog;

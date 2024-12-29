import {
  ChevronLeftRounded,
  ChevronRightRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
  StarRounded,
} from '@mui/icons-material';
import { Card, CardContent, CardMedia, IconButton, Typography, Box } from '@mui/material';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { formatDateRange, formatPrice } from '../../../utils';
import { IRoom } from '../../../types';

interface AccommodationCardProps extends Omit<IRoom, 'id' | 'createdAt' | 'updatedAt' | 'status'> {
  roomTypeName: string;
  averageRating: number;
  startDate: string;
  endDate: string;
  onCardClick?: () => void;
}

const AccommodationCard = ({
  images,
  roomNumber,
  roomTypeName,
  averageRating,
  startDate,
  endDate,
  pricePerNight,
  onCardClick = () => {},
}: AccommodationCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card component="a" sx={{ position: 'relative', borderRadius: 2, boxShadow: 0, cursor: 'pointer' }}>
      <Carousel
        autoPlay={false}
        animation="slide"
        fullHeightHover={true}
        cycleNavigation={false}
        navButtonsAlwaysVisible={isHover}
        navButtonsProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            padding: 2,
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
          },
        }}
        navButtonsWrapperProps={{
          style: {
            height: 'fit-content',
            position: 'absolute',
            top: '45%',
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: 0,
            transform: 'scale(0.6)',
            position: 'absolute',
            bottom: 1,
            zIndex: 2,
          },
        }}
        indicatorIconButtonProps={{
          style: {
            padding: 2,
            color: 'rgba(255, 255, 255, 0.4)',
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            padding: 2,
            color: 'rgba(255, 255, 255, 1)',
          },
        }}
        NextIcon={<ChevronRightRounded sx={{ color: 'black.900' }} />}
        PrevIcon={<ChevronLeftRounded sx={{ color: 'black.900' }} />}
      >
        {images.map((image, index) => (
          <div key={index}>
            <CardMedia
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              component="img"
              image={image}
              sx={{ height: 250, backgroundColor: 'gray.200', borderRadius: 2 }}
            />
          </div>
        ))}
      </Carousel>
      <IconButton
        onClick={toggleFavorite}
        sx={{
          position: 'absolute',
          top: 10,
          right: 8,
          color: isFavorite ? 'primary.500' : 'white.50',
          ':hover': { transform: 'scale(1.1)' },
          transition: 'transform 0.3s',
          zIndex: 2,
        }}
      >
        {isFavorite ? <FavoriteRounded /> : <FavoriteBorderRounded />}
      </IconButton>
      <CardContent sx={{ px: 0, cursor: 'pointer' }} onClick={onCardClick}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'black.900' }}>
              {roomTypeName + ' - ' + roomNumber}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarRounded sx={{ fontSize: 16, color: 'yellow.500', mb: 0.1 }} />
              <Typography variant="body2" sx={{ color: 'black.900' }}>
                {averageRating?.toFixed(1)}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 400, color: 'gray.500' }}>
            {formatDateRange(startDate, endDate)}
          </Typography>
          <Typography variant="body2">
            <strong>{formatPrice(pricePerNight)}</strong> / night
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccommodationCard;

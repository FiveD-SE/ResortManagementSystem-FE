import { Box, ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import ShowAllPhotosButton from './ShowAllPhotosButton';

interface Image {
  src: string;
  alt: string;
  featured?: boolean;
}

interface PhotoGalleryProps {
  images: Image[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
        gap: 2.5,
      }}
    >
      <ImageList
        sx={{ width: '100%', overflow: 'hidden', borderRadius: '24px' }}
        cols={isSmallScreen ? 2 : 4}
        rowHeight={250}
      >
        {images.map((item, index) => (
          <ImageListItem
            key={index}
            cols={item.featured && !isSmallScreen ? 2 : 1}
            rows={item.featured && !isSmallScreen ? 2 : 1}
            sx={{
              overflow: 'hidden',
              ':hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.5s',
              },
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <ShowAllPhotosButton />
    </Box>
  );
};

export default PhotoGallery;

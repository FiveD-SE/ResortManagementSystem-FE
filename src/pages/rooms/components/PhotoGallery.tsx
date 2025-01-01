import {
  Box,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ShowAllPhotosButton from './ShowAllPhotosButton';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { ChevronLeftRounded, ChevronRightRounded, FavoriteBorderRounded, ShareRounded } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
interface PhotoGalleryProps {
  images: string[];
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
        cols={isSmallScreen ? 1 : 4}
        rowHeight={250}
      >
        {!isSmallScreen &&
          images.map((item, index) => (
            <ImageListItem
              key={index}
              cols={index === 0 && !isSmallScreen ? 2 : 1}
              rows={index === 0 && !isSmallScreen ? 2 : 1}
              sx={{
                overflow: 'hidden',
                ':hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.5s',
                },
              }}
            >
              <img
                src={item}
                alt={`Image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </ImageListItem>
          ))}
        {isSmallScreen ? (
          <Carousel
            sx={{ width: '100%', overflow: 'hidden', borderRadius: '24px' }}
            autoPlay={false}
            animation="slide"
            fullHeightHover={true}
            cycleNavigation={false}
            navButtonsAlwaysVisible={false}
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
                  component="img"
                  image={image}
                  sx={{ height: 250, backgroundColor: 'gray.200', borderRadius: 2, objectFit: 'contain' }}
                />
              </div>
            ))}
          </Carousel>
        ) : null}
      </ImageList>
      <ShowAllPhotosButton onClick={handleOpenDialog} />
      <Dialog fullScreen open={openDialog} onClose={handleCloseDialog} TransitionComponent={Transition}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton size="large" edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close" sx={{}}>
              <ChevronLeftRounded fontSize="large" />
            </IconButton>
            <Stack direction="row" spacing={2}>
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
        </DialogTitle>
        <DialogContent>
          <Container sx={{ py: 4 }}>
            <ImageList cols={images.length > 1 ? 2 : 1} gap={16} sx={{ width: '100%', overflowY: 'hidden' }}>
              {images.map((item, index) => {
                return (
                  <ImageListItem key={index}>
                    <img
                      src={item}
                      alt={`Image ${index + 1}`}
                      style={{
                        display: 'block',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Container>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PhotoGallery;

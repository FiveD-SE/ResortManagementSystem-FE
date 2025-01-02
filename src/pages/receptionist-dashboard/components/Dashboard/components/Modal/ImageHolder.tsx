import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

interface IProps {
  images: string[];
}

const ImageHolder = (props: IProps) => {
  const { images } = props;
  const preProcessImages = images.map((image, index) => ({
    img: image,
    title: itemData[index]?.title || '',
    rows: itemData[index]?.rows || 1,
    cols: itemData[index]?.cols || 1,
  }));
  return (
    <Box
      sx={{
        overflowY: 'scroll',
        flex: 1,
        scrollbarWidth: 'none',
        paddingX: 2,
        borderRadius: 2,
        border: '1px solid rgb(222, 222, 222)',
      }}
    >
      <ImageList variant="quilted" cols={4}>
        {images.map((item, index) => (
          <ImageListItem key={index} cols={1} rows={1}>
            <img {...srcset(item, 121, 1, 1)} alt={item} loading="lazy" style={{ borderRadius: 8 }} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
];

export default ImageHolder;

import { Box, Grid, Typography } from '@mui/material';
import AmenityItem from './AmenitiyItem';
import { amenities, getRandomIcon } from '../../../constants/amenities';

interface AmenitiesProps {
  amenities: string[];
}

const Amenities = ({ amenities: selectedAmenities }: AmenitiesProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 2,
        px: 0,
        py: 3,
        borderTop: 1,
        borderColor: 'black.50',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        <Typography variant="h6" component="div">
          Amenities
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {selectedAmenities.map((amenityKey, index) => {
          const amenity = amenities[amenityKey.toLowerCase()];
          const displayIcon = amenity ? amenity.icon : getRandomIcon();
          const displayTitle = amenity ? amenity.title : amenityKey;
          return <AmenityItem key={index} icon={displayIcon} title={displayTitle} />;
        })}
      </Grid>
    </Box>
  );
};

export default Amenities;

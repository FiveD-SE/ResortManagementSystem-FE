import { Box, Button, Grid, Typography } from '@mui/material';
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
          const amenity = amenities[amenityKey];
          const displayIcon = amenity ? amenity.icon : getRandomIcon();
          const displayTitle = amenity ? amenity.title : amenityKey;
          return <AmenityItem key={index} icon={displayIcon} title={displayTitle} />;
        })}
      </Grid>
      <Box>
        <Button
          variant="outlined"
          sx={{
            px: 3,
            py: 1,
            borderRadius: 3,
            backgroundColor: 'white.50',
            borderColor: 'black.500',
            color: 'black.500',
            border: '1px solid',
            ':hover': {
              backgroundColor: 'gray.50',
            },
          }}
        >
          <Typography sx={{ fontSize: 14, textTransform: 'none', fontWeight: 500 }}>
            Show all {selectedAmenities.length} amenities
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Amenities;

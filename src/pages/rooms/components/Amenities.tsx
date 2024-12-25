import { Box, Button, Grid, Typography } from '@mui/material';
import AmenityItem from './AmenitiyItem';

const Amenities = () => {
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
        {amenities.map((amenity, index) => (
          <AmenityItem key={index} icon={amenity.icon} title={amenity.title} />
        ))}
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
          <Typography sx={{ fontSize: 14, textTransform: 'none', fontWeight: 500 }}>Show all 20 amenities</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Amenities;

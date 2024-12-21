import { Card, CardContent, Skeleton, IconButton, Box } from '@mui/material';

const AccommodationCardSkeleton = () => {
  return (
    <Card sx={{ position: 'relative', borderRadius: 2, boxShadow: 0 }}>
      <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
      <IconButton
        sx={{
          position: 'absolute',
          top: 10,
          right: 8,
          zIndex: 2,
        }}
      >
        <Skeleton variant="circular" width={24} height={24} />
      </IconButton>
      <CardContent sx={{ px: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton width={120} height={20} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Skeleton width={30} height={20} />
            </Box>
          </Box>
          <Skeleton width={80} height={20} />
          <Skeleton width={100} height={20} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccommodationCardSkeleton;

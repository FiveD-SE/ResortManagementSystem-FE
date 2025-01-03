import { Box, Skeleton } from '@mui/material';

const RoomDetailSkeleton = () => {
  return (
    <Box display="flex" flexDirection="column" padding={4} gap={4}>
      <Box display="flex" flexDirection="row" gap={2}>
        <Skeleton variant="rectangular" width="60%" height="300px" sx={{ borderRadius: 1 }} />

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1} width="40%">
          <Skeleton variant="rectangular" height="145px" sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height="145px" sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height="145px" sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height="145px" sx={{ borderRadius: 1 }} />
        </Box>
      </Box>

      <Box display="flex" flexDirection="column">
        <Skeleton width="50%" height="40px" />
        <Skeleton width="70%" height="30px" />
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="space-between" gap={1}>
        <Box display="flex" flexDirection="column" width="60%">
          <Skeleton width="80%" height="40px" />
          <Skeleton width="90%" height="40px" />
          <Skeleton width="70%" height="40px" />
        </Box>

        <Box display="flex" flexDirection="column" width="35%">
          <Skeleton variant="rectangular" width="100%" height="100px" sx={{ borderRadius: 1 }} />
          <Skeleton width="50%" height="40px" />
        </Box>
      </Box>
    </Box>
  );
};

export default RoomDetailSkeleton;

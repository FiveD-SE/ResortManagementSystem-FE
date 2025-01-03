import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box, Divider } from '@mui/material';

const TextLoading = () => {
  return (
    <Stack spacing={2} gap={2}>
      <Skeleton variant="text" height={40} width={200} sx={{ borderRadius: 2 }} />
      <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
      <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
      <Divider />
      <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
      <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Skeleton variant="rectangular" height={50} width={200} sx={{ borderRadius: 2 }} />
      </Box>
    </Stack>
  );
};

const CardLoading = () => {
  return (
    <Stack spacing={3} sx={{ padding: 4, border: '1px solid #E0E0E0', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Skeleton variant="rectangular" width={128} height={128} sx={{ borderRadius: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2, flex: 1 }}>
          <Skeleton variant="text" width="60%" sx={{ borderRadius: 2 }} />
          <Skeleton variant="text" width="40%" sx={{ borderRadius: 2 }} />
        </Box>
      </Box>
      <Divider />
      <Stack spacing={2}>
        <Skeleton variant="text" sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" width="60%" sx={{ borderRadius: 2 }} />
      </Stack>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton variant="text" width="20%" sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" width="20%" sx={{ borderRadius: 2 }} />
      </Box>
    </Stack>
  );
};

export { TextLoading, CardLoading };

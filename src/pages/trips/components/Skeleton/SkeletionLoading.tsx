import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const TextLoading = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  );
};

const CardLoading = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={'100%'} height={200} />
      <Skeleton variant="rounded" width={'100%'} height={200} />
    </Stack>
  );
};

export { TextLoading, CardLoading };

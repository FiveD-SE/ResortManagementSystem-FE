import { AppsRounded } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

import { MouseEventHandler } from 'react';

interface ShowAllPhotosButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ShowAllPhotosButton = ({ onClick }: ShowAllPhotosButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      startIcon={<AppsRounded sx={{ color: 'gray.500' }} />}
      sx={{
        display: { xs: 'none', sm: 'flex' },
        backgroundColor: 'white.50',
        color: 'black.500',
        border: '1px solid',
        borderRadius: 3,
        position: 'absolute',
        bottom: 30,
        right: 20,
      }}
    >
      <Typography sx={{ textTransform: 'none', fontSize: 14, fontWeight: 500 }}>Show all photos</Typography>
    </Button>
  );
};

export default ShowAllPhotosButton;

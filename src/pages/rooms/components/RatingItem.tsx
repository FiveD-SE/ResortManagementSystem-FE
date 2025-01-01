import { Box, Typography } from '@mui/material';
import { ElementType, Fragment } from 'react';

interface RatingItemProps {
  label: string;
  value: number;
  icon: ElementType;
  orientation?: 'horizontal' | 'vertical';
}

const RatingItem: React.FC<RatingItemProps> = ({ label, value, icon: Icon, orientation = 'vertical' }) => {
  return (
    <Fragment>
      {orientation === 'vertical' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 1.5,
            flex: 1,
          }}
        >
          <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
            {label}
          </Typography>
          <Typography variant="h5">{value}</Typography>
          <Icon />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1.5,
            flex: 1,
          }}
        >
          <Icon />
          <Typography variant="subtitle1" sx={{ flex: 1, ml: 1, fontWeight: 500, whiteSpace: 'nowrap' }}>
            {label}
          </Typography>
          <Typography variant="h6">{value}</Typography>
        </Box>
      )}
    </Fragment>
  );
};

export default RatingItem;

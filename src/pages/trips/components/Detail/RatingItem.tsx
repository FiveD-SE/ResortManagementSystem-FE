import { Box, Rating, Typography } from '@mui/material';

interface IProps {
  title: string;
  value: number;
}

const RatingItem = (props: IProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
      <Typography variant="body1" sx={{ width: '100px', fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
        {props.title}
      </Typography>
      <Rating name="read-only" value={props.value} readOnly sx={{ color: '#F6475F' }} />
    </Box>
  );
};

export default RatingItem;

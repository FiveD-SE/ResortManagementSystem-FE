import { Box, Rating, Typography } from '@mui/material';
import React from 'react';

interface Rating {
  title: string;
  value: number | null;
}

interface IProps {
  title: string;
  value: number;
  onChange: React.Dispatch<React.SetStateAction<Rating[]>>;
}

const RatingItem = (props: IProps) => {
  const [value, setValue] = React.useState<number | null>(props.value);
  React.useEffect(() => {
    props.onChange((prevRatings) =>
      prevRatings.map((rating) => (rating.title === props.title ? { ...rating, value } : rating)),
    );
  }, [value]);
  return (
    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
      <Typography sx={{ width: '100px', fontFamily: 'Be Vietnam Pro', fontWeight: 600, fontSize: 18 }}>
        {props.title}
      </Typography>
      <Rating
        value={props.value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ color: '#F6475F' }}
      />
    </Box>
  );
};

export default RatingItem;

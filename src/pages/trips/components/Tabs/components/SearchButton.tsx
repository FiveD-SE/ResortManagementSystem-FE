import { Button } from '@mui/material';

const SearchButton = () => {
  return (
    <Button
      variant="outlined"
      sx={{ color: '#5C5C5C', borderColor: '#5C5C5C', marginY: 2 }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(92, 92, 92, 0.1)')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
    >
      Start Searching
    </Button>
  );
};

export default SearchButton;

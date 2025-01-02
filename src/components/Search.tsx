import { SearchRounded, TuneRounded } from '@mui/icons-material';
import { IconButton, Box, Typography, styled } from '@mui/material';

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.common.white,
  border: '0.5px solid rgba(0,0,0,0.08)',
  borderRadius: 40,
  width: '100%',
  boxShadow: '0 6px 20px 0 rgba(0,0,0,0.1)',
  transition: 'box-shadow 0.3s',
  padding: '0.2rem 0.5rem',
}));

const FilterButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[500]}`,
  height: 'fit-content',
}));

function Search() {
  const commonTypographyStyles = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'black.500',
  };

  return (
    <>
      {/* Mobile View */}
      <Box display={{ xs: 'flex', sm: 'none' }} flexDirection="row" gap={2} alignItems="center" flex={1}>
        <SearchBox>
          <Box display="flex" alignItems="center" p="10px">
            <SearchRounded sx={{ color: 'black.500' }} />
            <Typography
              sx={{
                ...commonTypographyStyles,
                marginLeft: 1,
                flex: 1,
              }}
            >
              Start your new search
            </Typography>
          </Box>
        </SearchBox>
        <FilterButton>
          <TuneRounded sx={{ color: 'black.500' }} />
        </FilterButton>
      </Box>
    </>
  );
}

export default Search;

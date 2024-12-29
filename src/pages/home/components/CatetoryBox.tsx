import { Box, Typography, IconButton } from '@mui/material';
import { HolidayVillageRounded } from '@mui/icons-material';

type CategoryBoxProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

function CategoryBox({ label, selected, onClick }: CategoryBoxProps) {
  return (
    <Box
      sx={{
        borderBottom: 2,
        borderColor: selected ? 'black.900' : 'transparent',
        '&:hover': selected
          ? {}
          : {
              borderBottom: 2,
              borderColor: 'black.50',
            },
        transition: 'border-color 0.3s',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          p: 1,
          color: selected ? 'black.900' : 'black.200',
          cursor: 'pointer',
          transition: 'color 0.3s, transform 0.3s',
          ':active': {
            transform: 'scale(0.9)',
          },
        }}
      >
        <IconButton
          disableRipple
          size="large"
          sx={{
            ':hover': { backgroundColor: 'transparent' },
            color: selected ? 'black.900' : 'black.200',
            p: { xs: 0, sm: 1 },
          }}
        >
          <HolidayVillageRounded />
        </IconButton>
        <Typography
          variant="body2"
          sx={{
            color: selected ? 'black.900' : 'black.200',
            fontSize: '0.75rem',
            fontWeight: selected ? 600 : 500,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

export default CategoryBox;

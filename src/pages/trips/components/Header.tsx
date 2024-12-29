import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface IProps {
  haveBackNav?: boolean;
  title: string;
}

const Header = (props: IProps) => {
  return (
    <Box sx={{ display: 'flex', paddingY: 8, alignItems: 'center' }} gap={2}>
      {props.haveBackNav && (
        <IconButton onClick={() => window.history.back()} size="large">
          <ArrowBackIosNewIcon />
        </IconButton>
      )}
      <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 48, fontWeight: 600 }}>{props.title}</Typography>
    </Box>
  );
};

export default Header;

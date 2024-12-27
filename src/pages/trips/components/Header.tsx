import { Box, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
interface IProps {
  haveBackNav?: boolean;
}

const Header = (props: IProps) => {
  return (
    <Box sx={{ display: 'flex', paddingY: 8, alignItems: 'center' }}>
      {props.haveBackNav && <ArrowBackIosIcon sx={{ width: 40, height: 40 }} />}
      <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 48, fontWeight: 600 }}>Booking</Typography>
    </Box>
  );
};

export default Header;

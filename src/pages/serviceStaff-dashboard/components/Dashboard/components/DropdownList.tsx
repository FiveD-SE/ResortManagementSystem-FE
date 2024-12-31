import { MoreHoriz } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, MenuList } from '@mui/material';
import * as React from 'react';
import { useCheckinMutation, useCheckoutMutation } from '../../../../../apis/bookingApi';
import { IBooking } from '../../../../../types';

interface IProps {
  type: string;
  id: string;
  setData: React.Dispatch<React.SetStateAction<IBooking[]>>;
  openDetailModal: () => void;
}
const DropdownList = (props: IProps) => {
  const [checkin] = useCheckinMutation();
  const [checkout] = useCheckoutMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [types, setTypes] = React.useState<string[]>([]);
  const handleMenuClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);
  const handleMenuOpen = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleOnClick = React.useCallback(
    (type: string) => {
      console.log(type);
      if (type == 'Checked in') {
        checkin(props.id);
        props.setData((prevData) =>
          prevData.map((item) => (item.id === props.id ? { ...item, status: 'Checked in' } : item)),
        );
      } else if (type == 'Checked out') {
        checkout(props.id);
        props.setData((prevData) =>
          prevData.map((item) => (item.id === props.id ? { ...item, status: 'Checked out' } : item)),
        );
      } else {
        console.log('View Details');
        props.openDetailModal();
      }

      handleMenuClose();
    },
    [types],
  );
  const typeList = (type: string) => {
    if (type == 'Checked in') {
      setTypes(['View Details', 'Checked out']);
    } else if (type == 'Pending') {
      setTypes(['View Details', 'Checked in']);
    } else {
      setTypes(['View Details']);
    }
  };
  React.useEffect(() => {
    typeList(props.type);
  }, [props.type]);
  return (
    <Box>
      <IconButton onClick={handleMenuOpen}>
        <MoreHoriz />
      </IconButton>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { width: '10%', borderRadius: '0.75rem' } }}
      >
        {types.map((type, index) => (
          <MenuItem key={index} onClick={() => handleOnClick(type)}>
            {type}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropdownList;

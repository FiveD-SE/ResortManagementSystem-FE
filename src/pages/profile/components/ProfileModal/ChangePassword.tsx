import { Box, Modal, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ChangePassword = (props: IProps) => {
  const { open, onClose } = props;
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Be Vietnam Pro', mb: 2 }}>
            Change Password
          </Typography>
          <ClearIcon onClick={onClose} sx={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer' }} />
        </Box>
        <Stack>
          <Box>
            <Typography sx={{ fontSize: 20, fontFamily: 'Be Vietnam Pro', mb: 2 }}>Current Password</Typography>
            <TextField variant="outlined" type="password" sx={{ width: '100%' }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 20, fontFamily: 'Be Vietnam Pro', mb: 2 }}>New Password</Typography>
            <TextField variant="outlined" type="password" sx={{ width: '100%' }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 20, fontFamily: 'Be Vietnam Pro', mb: 2 }}>Confirm New Password</Typography>
            <TextField variant="outlined" type="password" sx={{ width: '100%' }} />
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChangePassword;

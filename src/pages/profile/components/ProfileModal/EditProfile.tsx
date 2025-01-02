import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
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

const EditProfile = (props: IProps) => {
  const { open, onClose } = props;
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Be Vietnam Pro', mb: 2 }}>
            Edit Profile
          </Typography>
          <ClearIcon onClick={onClose} sx={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer' }} />
        </Box>
        <Stack>
          <img
            src="https://placehold.co/400x400.png"
            style={{ width: 200, height: 200, alignSelf: 'center', borderRadius: 100, marginBottom: 16 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 0.5 }}>
              <Typography sx={{ fontSize: 20, fontFamily: 'Be Vietnam Pro', mb: 2 }}>First Name</Typography>
              <TextField variant="outlined" type="text" sx={{ width: '100%' }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 0.5 }}>
              <Typography sx={{ fontSize: 20, fontFamily: 'Be Vietnam Pro', mb: 2 }}>Last Name</Typography>
              <TextField variant="outlined" type="text" sx={{ width: '100%' }} />
            </Box>
          </Box>
        </Stack>
        <Button variant="contained" sx={{ width: '100%', height: 50, borderRadius: 3, mt: 2 }}>
          <Typography sx={{ fontSize: 20, fontFamily: 'Be Vietnam Pro' }}>Save</Typography>
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProfile;

import { TaskAltRounded, CloseRounded, DeleteRounded } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material';

interface PopupModalProps {
  type: string;
  open: boolean;
  title: string;
  message: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PopupModal = ({ type, open, title, message, onClose, onConfirm, isLoading }: PopupModalProps) => {
  const renderIconBasedOnType = () => {
    switch (type) {
      case 'confirm':
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '12px',
              borderRadius: 100,
              bgcolor: 'green.50',
            }}
          >
            <TaskAltRounded sx={{ color: 'green.500' }} fontSize="large" />
          </Box>
        );
      case 'delete':
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '12px',
              borderRadius: 100,
              bgcolor: 'red.50',
            }}
          >
            <DeleteRounded sx={{ color: 'red.500' }} fontSize="large" />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          width: { xs: '90%', sm: '50%', md: '500px', lg: '450px', xl: '400px' },
          bgcolor: 'white.50',
          boxShadow: 24,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {renderIconBasedOnType()}
          <IconButton
            sx={{
              padding: 0,
              color: 'gray.500',
              ':hover': { scale: 0.95, color: 'primary.500' },
              transition: 'ease-in-out 0.2s',
            }}
            onClick={onClose}
          >
            <CloseRounded sx={{ height: 28, width: 28 }} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1, userSelect: 'none', mt: 1 }}>
          <Typography sx={{ fontSize: 24, fontWeight: 600, color: 'black.900' }}>{title}</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'black.200' }}>{message}</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, padding: 1, mt: 6 }}>
          <Button
            fullWidth
            sx={{
              display: 'flex',
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'none',
              padding: '8px 24px',
              bgcolor: 'white.50',
              color: '#5C5C5C',
              border: '1px solid #E0E0E0',
              ':hover': { borderColor: 'black.100' },
              borderRadius: 2,
              ':disabled': { color: 'gray.200', bgcolor: 'gray.100' },
            }}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            sx={{
              display: 'flex',
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'none',
              padding: '8px 24px',
              bgcolor: 'primary.500',
              color: 'white.50',
              border: '1px solid #FF385C',
              ':hover': { bgcolor: 'primary.600' },
              borderRadius: 2,
              ':disabled': { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' },
            }}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: 'white.50' }} /> : 'Confirm'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PopupModal;

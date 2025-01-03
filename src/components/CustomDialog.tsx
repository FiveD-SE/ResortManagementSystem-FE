import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Slide } from '@mui/material';
import { Close } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  actions?: React.ReactNode;
}

const CustomDialog: React.FC<DialogProps> = ({ open, onClose, children, maxWidth = 'md', actions }) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      keepMounted
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          overflowY: 'hidden',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, overflowY: 'auto' }}>{children}</DialogContent>
      {actions && <Box sx={{ p: 2 }}>{actions}</Box>}
    </Dialog>
  );
};

export default CustomDialog;

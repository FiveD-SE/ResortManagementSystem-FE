import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import { Close, SvgIconComponent } from '@mui/icons-material';
import { forwardRef, Ref } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import ThingsToKnowSection from './ThingsToKnowSection';

interface ThingsToKnowDialogProps {
  open: boolean;
  onClose: () => void;
  selectedItem: {
    dialogTitle: string;
    dialogContent: {
      heading: string;
      details: { icon?: SvgIconComponent; text: string }[];
    }[];
  } | null;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ThingsToKnowDialog = ({ open, onClose, selectedItem }: ThingsToKnowDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 5 }}>
        <Typography variant="h1" sx={{ fontWeight: 500, mt: 1, mb: 2 }}>
          {selectedItem?.dialogTitle}
        </Typography>
        {selectedItem?.dialogContent.map((section, index) => (
          <ThingsToKnowSection
            key={index}
            label={section.heading}
            data={section.details.map((detail) => ({
              icon: detail.icon ?? null,
              detail: detail.text,
            }))}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default ThingsToKnowDialog;

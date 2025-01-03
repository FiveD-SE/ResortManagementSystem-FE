import { Box, TextField, Typography } from '@mui/material';

const Message = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        pb: 2,
        justifyContent: 'center',
        gap: 2,
        pt: 2,
        borderTop: 1,
        borderColor: 'black.50',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%' }}>
        <Typography variant="h6" component="div" sx={{ color: 'black.500' }}>
          Message
        </Typography>
        <Typography variant="body2" sx={{ color: 'black.300' }}>
          Before you can continue, let us know a little about your trip and why their place is a good fit
        </Typography>
      </Box>
      <TextField variant="outlined" fullWidth multiline rows={4} sx={{ borderRadius: 2, borderColor: 'black.100' }} />
    </Box>
  );
};

export default Message;

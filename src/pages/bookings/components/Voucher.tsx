import { Box, FormControl, List, ListItem, Paper, Radio, Typography } from '@mui/material';
import { useState } from 'react';

const Voucher = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number): void => {
    setSelectedIndex(index);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 2,
        pt: 2,
        pb: 1.5,
        px: 0,
        borderTop: 1,
        borderColor: 'black.50',
      }}
    >
      <Typography variant="h6" component="div" sx={{ color: 'black.500' }}>
        Voucher
      </Typography>
      <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflowX: 'auto', width: '100%', padding: 0 }}>
        <List
          dense
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            overflowX: 'auto',
            width: '100%',
            padding: 0,
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <ListItem key={index} sx={{ width: 'auto', p: 0 }}>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  border: 1,
                  borderColor: selectedIndex === index ? 'primary.500' : 'black.100',
                  minWidth: 200,
                }}
                onClick={() => handleSelect(index)}
              >
                <Radio checked={selectedIndex === index} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography variant="caption" sx={{ color: 'primary.500' }}>
                    HOT
                  </Typography>
                  <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', color: 'black.500', fontWeight: 500 }}>
                    Voucher name {index}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black.300' }}>
                    Description {index}
                  </Typography>
                </Box>
              </Paper>
            </ListItem>
          ))}
        </List>
      </FormControl>
    </Box>
  );
};

export default Voucher;

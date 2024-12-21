import { useState, useEffect } from 'react';
import { Fab, Grow } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Grow in={visible} timeout={300}>
      <Fab
        size="medium"
        aria-label="scroll back to top"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          backgroundColor: 'dark.500',
          '&:hover': {
            backgroundColor: 'dark.400',
          },
        }}
      >
        <KeyboardArrowUpIcon sx={{ color: 'white.50', width: 32, height: 32 }} />
      </Fab>
    </Grow>
  );
};

export default ScrollToTopButton;

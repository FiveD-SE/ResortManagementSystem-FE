import { useLocation, useSearchParams } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import CategoryBox from './CatetoryBox';
import { ChevronLeftRounded, ChevronRightRounded, TuneRounded, VillaRounded } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

export const categories = [
  {
    label: 'Villa1',
    icon: VillaRounded,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Villa2',
    icon: VillaRounded,
    description: 'This property has windmills!',
  },
  {
    label: 'Villa3',
    icon: VillaRounded,
    description: 'This property is modern!',
  },
  {
    label: 'Villa4',
    icon: VillaRounded,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Villa5',
    icon: VillaRounded,
    description: 'This property has a beautiful pool!',
  },
  {
    label: 'Villa6',
    icon: VillaRounded,
    description: 'This property is on an island!',
  },
  {
    label: 'Villa7',
    icon: VillaRounded,
    description: 'This property is near a lake!',
  },
  {
    label: 'Villa8',
    icon: VillaRounded,
    description: 'This property has skiing activities!',
  },
  {
    label: 'Villa9',
    icon: VillaRounded,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Villa10',
    icon: VillaRounded,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Villa1',
    icon: VillaRounded,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Villa2',
    icon: VillaRounded,
    description: 'This property has windmills!',
  },
  {
    label: 'Villa3',
    icon: VillaRounded,
    description: 'This property is modern!',
  },
  {
    label: 'Villa4',
    icon: VillaRounded,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Villa5',
    icon: VillaRounded,
    description: 'This property has a beautiful pool!',
  },
  {
    label: 'Villa6',
    icon: VillaRounded,
    description: 'This property is on an island!',
  },
  {
    label: 'Villa7',
    icon: VillaRounded,
    description: 'This property is near a lake!',
  },
  {
    label: 'Villa8',
    icon: VillaRounded,
    description: 'This property has skiing activities!',
  },
  {
    label: 'Villa9',
    icon: VillaRounded,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Villa10',
    icon: VillaRounded,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Villa1',
    icon: VillaRounded,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Villa2',
    icon: VillaRounded,
    description: 'This property has windmills!',
  },
  {
    label: 'Villa3',
    icon: VillaRounded,
    description: 'This property is modern!',
  },
  {
    label: 'Villa4',
    icon: VillaRounded,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Villa5',
    icon: VillaRounded,
    description: 'This property has a beautiful pool!',
  },
  {
    label: 'Villa6',
    icon: VillaRounded,
    description: 'This property is on an island!',
  },
  {
    label: 'Villa7',
    icon: VillaRounded,
    description: 'This property is near a lake!',
  },
  {
    label: 'Villa8',
    icon: VillaRounded,
    description: 'This property has skiing activities!',
  },
  {
    label: 'Villa9',
    icon: VillaRounded,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Villa10',
    icon: VillaRounded,
    description: 'This property is in a spooky cave!',
  },
];

function Categories() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (!container) return;

      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft + container.offsetWidth < container.scrollWidth);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const isMainPage = location.pathname === '/';

  if (!isMainPage) {
    return null;
  }

  const handleScroll = (direction: string) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 500;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflowX: 'hidden',
        transition: 'box-shadow 0.3s',
        gap: 2,
        px: { xs: 1, sm: 10 },
        pt: { xs: 0, sm: 1 },
        flex: 1,
        width: '100%',
        boxShadow: { xs: '0px 2px 5px rgba(0, 0, 0, 0.1)', sm: 0 },
        scrollbarWidth: 'none',
      }}
    >
      <Box sx={{ display: 'flex', width: '90%', gap: 2, position: 'relative', marginInlineEnd: 2 }}>
        {canScrollLeft && (
          <Box
            sx={{
              position: 'absolute',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              transition: 'opacity 0.3s, visibility 0.3s, transform 0.3s',
              backgroundImage: 'linear-gradient(to left,rgb(255 255 255/0.4),white calc(100% - 24px))',
              zIndex: 1,
              height: '100%',
              left: 0,
            }}
          >
            <IconButton
              onClick={() => handleScroll('left')}
              sx={{
                p: 0.6,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'black.100',
                backgroundColor: 'white.50',
                transition: 'box-shadow 0.3s, background-color 0.3s',
                ':hover': { boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: 'white.50' },
              }}
              children={<ChevronLeftRounded />}
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            gap: 2,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
          }}
          ref={containerRef}
        >
          {categories.map((item, index) => (
            <CategoryBox key={index} icon={item.icon} label={item.label} selected={category === item.label} />
          ))}
        </Box>
        {canScrollRight && (
          <Box
            sx={{
              position: 'absolute',
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              transition: 'opacity 0.2s, visibility 0.2s, transform 0.2s',
              backgroundImage: 'linear-gradient(to right,rgb(255 255 255/0.4),white calc(100% - 24px))',
              zIndex: 1,
              height: '100%',
              right: 'calc(-1 * 4px)',
              paddingInlineEnd: 1,
            }}
          >
            <IconButton
              onClick={() => handleScroll('right')}
              sx={{
                p: 0.6,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'black.100',
                backgroundColor: 'white.50',
                transition: 'opacity 0.3s, visibility 0.3s, transform 0.3s',
                ':hover': { boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: 'white.50' },
              }}
              children={<ChevronRightRounded />}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          gap: 1,
          p: 2,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'black.100',
          alignItems: 'center',
          ':hover': {
            borderColor: 'black.200',
            cursor: 'pointer',
            backgroundColor: 'gray.50',
          },
          transition: 'border-color 0.3s, background-color 0.3s',
        }}
      >
        <TuneRounded />
        <Typography variant="body2" sx={{ color: 'black.900' }}>
          Filters
        </Typography>
      </Box>
    </Box>
  );
}

export default Categories;

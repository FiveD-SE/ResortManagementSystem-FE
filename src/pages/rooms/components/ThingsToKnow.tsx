import {
  AlarmOutlined,
  CelebrationOutlined,
  ChevronRightRounded,
  Co2Outlined,
  PetsOutlined,
  ScheduleOutlined,
  SmokeFreeOutlined,
  StairsOutlined,
  SvgIconComponent,
} from '@mui/icons-material';
import { Box, Grid, IconButton, Link, Typography } from '@mui/material';
import { useState } from 'react';
import ThingsToKnowDialog from './ThingsToKnowDialog';

interface ThingsToKnowItem {
  title: string;
  summary: string[];
  dialogTitle: string;
  dialogContent: {
    heading: string;
    details: { icon?: SvgIconComponent; text: string }[];
  }[];
}

const thingsToKnowData: ThingsToKnowItem[] = [
  {
    title: 'House rules',
    summary: ['Check-in: 2:00 PM - 8:00 PM', 'Checkout before 10:00 AM', '2 guests maximum'],
    dialogTitle: 'House Rules',
    dialogContent: [
      {
        heading: 'Checking in and out',
        details: [
          { icon: ScheduleOutlined, text: 'Check-in: 2:00 PM - 12:00 AM' },
          { icon: ScheduleOutlined, text: 'Checkout before 11:00 AM' },
        ],
      },
      {
        heading: 'During your stay',
        details: [
          { icon: PetsOutlined, text: 'Pets allowed' },
          { icon: CelebrationOutlined, text: 'No parties or events' },
          { icon: SmokeFreeOutlined, text: 'No smoking' },
        ],
      },
    ],
  },
  {
    title: 'Safety & property',
    summary: ['No carbon monoxide alarm', 'No smoke alarm', 'Pool/hot tub without a gate or lock'],
    dialogTitle: 'Safety & property',
    dialogContent: [
      {
        heading: 'Safety',
        details: [
          { icon: Co2Outlined, text: 'No carbon monoxide alarm' },
          { icon: AlarmOutlined, text: 'No smoke alarm' },
        ],
      },
      {
        heading: 'Property',
        details: [
          { icon: StairsOutlined, text: 'Must climb stairs' },
          { icon: PetsOutlined, text: 'Pool/hot tub without a gate or lock' },
        ],
      },
    ],
  },
];

const ThingsToKnow = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ThingsToKnowItem | null>(null);

  const handleOpenDialog = (item: ThingsToKnowItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 3,
        px: 0,
        py: 3,
        borderTop: 1,
        borderColor: 'black.50',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%' }}>
        <Typography variant="h5" component="div" sx={{ width: '100%', fontWeight: 600, color: 'black.500' }}>
          Things to know
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {thingsToKnowData.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: 'black.500', display: 'flex', alignItems: 'center' }}
              >
                {item.title}
                <IconButton
                  size="small"
                  onClick={() => handleOpenDialog(item)}
                  sx={{
                    display: {
                      xs: 'flex',
                      md: 'none',
                    },
                  }}
                >
                  <ChevronRightRounded />
                </IconButton>
              </Typography>
              {item.summary.map((summaryItem, summaryIndex) => (
                <Typography key={summaryIndex} variant="body2" sx={{ color: 'black.500' }}>
                  {summaryItem}
                </Typography>
              ))}
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                  alignItems: 'center',
                  pt: {
                    xs: 2,
                    md: 0,
                  },
                }}
              >
                <Link onClick={() => handleOpenDialog(item)} underline="hover" sx={{ color: 'black.500', fontWeight: 500 }}>
                  Show more
                </Link>
                <ChevronRightRounded />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <ThingsToKnowDialog open={dialogOpen} onClose={handleCloseDialog} selectedItem={selectedItem} />
    </Box>
  );
};

export default ThingsToKnow;

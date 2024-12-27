import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React from 'react';

const data = [
    {
        index: 1,
        type: "Standard Room",
        rates: 80,
        firgures: "70%",
    },
    {
        index: 2,
        type: "Deluxe Room",
        rates: 50,
        firgures: "85%",
    },
    {
        index: 3,
        type: "Suite Room",
        rates: 20,
        firgures: "50%",
    },
    {
        index: 4,
        type: "Family Room",
        rates: 60,
        firgures: "40%",
    },
    {
        index: 5,
        type: "Penthouse",
        rates: 70,
        firgures: "15%",
    },
];

const RevenueByRoomType = () => {
    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: '100%', justifyContent: 'center' }}>
            {/* Title */}
            <Typography variant="h4" sx={{ mb: 4, textAlign: "left" }}>
                Revenue by room type
            </Typography>

            {/* Table */}
            <Box sx={{ flexGrow: 1, width: "100%", height: 400 }}>
                <TableContainer>
                    <Table aria-label="featured contest table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: 16, fontWeight: 600 }}>#</TableCell>
                                <TableCell sx={{ fontSize: 16, fontWeight: 600 }}>Room types</TableCell>
                                <TableCell sx={{ fontSize: 16, fontWeight: 600 }}>Rates</TableCell>
                                <TableCell sx={{ fontSize: 16, fontWeight: 600 }}>Firgures</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((room) => (
                                <React.Fragment key={room.index}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600 }}>{room.index}</TableCell>
                                        <TableCell>{room.type}</TableCell>
                                        <TableCell>
                                            <Box sx={{ bgcolor: 'black.900', borderRadius: 10 }}>
                                                <Box sx={{ backgroundColor: 'primary.500', height: 5, width: `${room.rates}%`, borderRadius: 10, transition: 'ease-in-out 0.3s' }} />
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    borderRadius: 3,
                                                    padding: '4px',
                                                    color: 'primary.500',
                                                    width: 80,
                                                    border: '1px solid #FF385C',
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {room.firgures}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default RevenueByRoomType;
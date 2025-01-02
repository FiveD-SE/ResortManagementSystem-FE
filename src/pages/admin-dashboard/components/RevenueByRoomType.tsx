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
import { IRoomTypeRevenue } from '../../../types/statistic';

interface RevenueByRoomTypeProps {
    roomTypeRevenue: IRoomTypeRevenue[] | undefined;
}

const RevenueByRoomType = ({ roomTypeRevenue }: RevenueByRoomTypeProps) => {
    if (!roomTypeRevenue || roomTypeRevenue.length === 0) return null;

    const totalRevenue = roomTypeRevenue.reduce((total, item) => total + item.revenue, 0);

    const formattedData = roomTypeRevenue.map((item, index) => ({
        index: index + 1,
        type: item.roomType,
        rates: totalRevenue > 0 ? (item.revenue / totalRevenue) * 100 : 0,
    }));

    const displayData = formattedData.slice(0, 5);

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
                                <TableCell sx={{ fontSize: 16, fontWeight: 600 }}>Figures</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayData.map((room, index) => (
                                <React.Fragment key={index}>
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
                                                {room.rates.toFixed(0)}%
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

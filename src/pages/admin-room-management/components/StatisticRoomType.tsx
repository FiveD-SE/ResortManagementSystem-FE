import { Circle, Settings } from '@mui/icons-material'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart';
import { IRoomApiResponse, IRoomTypeApiResponse } from '../../../types';

interface StatisticRoomTypeProps {
    onManageRoomType: () => void;
    roomsData: IRoomApiResponse | undefined;
    roomTypesData: IRoomTypeApiResponse | undefined;
}


const StatisticRoomType = ({ onManageRoomType, roomsData, roomTypesData }: StatisticRoomTypeProps) => {
    const colors = ['#FF385C', '#324155', '#43B75D', '#EE443F', '#FFAA00', '#0095FF'];

    const roomTypeMap = roomTypesData?.docs.reduce((acc, curr, index) => {
        acc[curr.id] = {
            label: curr.typeName,
            color: colors[index % colors.length],
        };
        return acc;
    }, {} as { [key: string]: { label: string; color: string } });

    const roomCounts = roomsData?.docs.reduce((acc, room) => {
        if (roomTypeMap && roomTypeMap[room.roomTypeId]) {
            const typeName = roomTypeMap[room.roomTypeId].label;
            acc[typeName] = (acc[typeName] || 0) + 1;
        }
        return acc;
    }, {} as { [key: string]: number });

    const data = roomCounts ? Object.entries(roomCounts).map(([label, value]) => ({
        label,
        value,
        color: roomTypeMap ? roomTypeMap[Object.keys(roomTypeMap).find(key => roomTypeMap[key].label === label)!].color : '',
    })) : [];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ color: 'black.900', fontSize: 18, fontWeight: 600 }}>
                    Room Type
                </Typography>
                <Button sx={{ color: 'white.50', bgcolor: 'primary.500', textTransform: 'none', padding: '8px 16px', borderRadius: 2 }} startIcon={<Settings />} onClick={onManageRoomType}>
                    Manage Room Type
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', border: '1px solid', borderColor: 'grey.300', borderRadius: 4, padding: 3 }}>
                <Typography sx={{ color: 'black.900', fontSize: 16, fontWeight: 600 }}>
                    Statistic
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ width: '30%', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PieChart
                            series={[{
                                data,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                innerRadius: 50,
                                outerRadius: 100,
                            }]}
                            width={200}
                            height={300}
                            margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
                            slotProps={{
                                legend: { hidden: true },
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 1, height: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Amount of room</TableCell>
                                        <TableCell>%</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                                                <Circle sx={{ color: row.color, height: 15, width: 15 }} />
                                                {row.label}
                                            </TableCell>
                                            <TableCell>{row.value}</TableCell>
                                            <TableCell>{((row.value / data.reduce((acc, cur) => acc + cur.value, 0)) * 100).toFixed(2)}%</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default StatisticRoomType
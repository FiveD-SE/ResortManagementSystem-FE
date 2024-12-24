import { Circle, Settings } from '@mui/icons-material'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
    { label: 'Single Room', value: 400, color: '#FF385C' },
    { label: 'Double Room', value: 300, color: '#324155' },
    { label: 'Triple Room', value: 300, color: '#43B75D' },
    { label: 'Quad Room', value: 200, color: '#EE443F' },
    { label: 'Queen Room', value: 200, color: '#FFAA00' },
    { label: 'King Room', value: 100, color: '#0095FF' },
];

const colors = ['#FF385C', '#324155', '#43B75D', '#EE443F', '#FFAA00', '#0095FF'];

interface StatisticRoomTypeProps {
    onManageRoomType: () => void;
}

const StatisticRoomType = ({ onManageRoomType }: StatisticRoomTypeProps) => {
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
                    <Box sx={{ flex: 1, height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                                                <Circle sx={{ color: colors[index], height: 15, width: 15 }} />
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
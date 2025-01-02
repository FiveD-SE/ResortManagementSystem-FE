import { Box, Button, Typography } from "@mui/material";
import { Download } from "@mui/icons-material";
import StatisticBox from "./StatisticBox";
import toast from "react-hot-toast";
import { useExportExcelMutation } from "../../../apis/adminDashboardApi";

interface StatisticProps {
    dailyRevenue: any;
    customerGrowth: any;
    roomAvailability: any;
}

const Statistic = ({ dailyRevenue, customerGrowth, roomAvailability }: StatisticProps) => {
    const [exportExcel, { isLoading }] = useExportExcelMutation();

    const handleExportExcel = async () => {
        try {
            const response = await exportExcel().unwrap();
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('Exported successfully');
        } catch (error) {
            toast.error('Failed to export file');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5'>Statistic</Typography>
                    <Typography variant='body2' sx={{ color: 'gray.300' }}>
                        Today's statistics
                    </Typography>
                </Box>
                <Button
                    sx={{
                        fontSize: 16,
                        color: 'black.900',
                        bgcolor: 'white.50',
                        border: '1px solid',
                        borderColor: 'gray.200',
                        borderRadius: 2,
                        textTransform: 'none',
                        padding: '4px 16px',
                        ":hover": {
                            bgcolor: 'black.900',
                            color: 'white.50',
                            transition: 'ease-in-out 0.3s',
                        },
                    }}
                    startIcon={<Download />}
                    onClick={handleExportExcel}
                    disabled={isLoading}
                >
                    {isLoading ? 'Exporting' : 'Export'}
                </Button>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                <StatisticBox title='Revenue' value={dailyRevenue?.revenue} growth={dailyRevenue?.growth} />
                <StatisticBox title='Total customers' value={customerGrowth?.customers} growth={customerGrowth?.growth} />
                <StatisticBox
                    title='Available rooms'
                    value={roomAvailability?.totalRooms - roomAvailability?.bookedRooms}
                    growth={0}
                    comparison={`${roomAvailability?.bookedRooms}/${roomAvailability?.totalRooms}`}
                />
            </Box>
        </Box>
    );
};

export default Statistic;

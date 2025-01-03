import { Box, Typography, IconButton } from "@mui/material"
import { Download } from "@mui/icons-material"
import Statistic from "./components/Statistic"
import PromotionTable from "./components/PromotionTable"
import { useGetPromotionsQuery } from "../../apis/promotionApi"
import React from "react"
import PromotionTableSkeleton from "./components/PromotionTableSkeleton"
import { useExportPromotionExcelMutation } from "../../apis/exportApi"
import toast from "react-hot-toast"

const PromotionManagement = () => {
    const [page, setPage] = React.useState(1)
    const { data: promotionData, isLoading } = useGetPromotionsQuery({ page: page, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' })
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const [exportExcel] = useExportPromotionExcelMutation();

    const handleExportExcel = async () => {
        try {
            const response = await exportExcel();

            if (response && response.data) {
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                if (blob.size === 0) {
                    toast.error('File is empty');
                    return;
                }

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'staff-report.xlsx');
                document.body.appendChild(link);
                link.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);

                toast.success('File exported successfully');
            } else {
                toast.error('Error exporting file');
            }
        } catch (error) {
            console.error('Excel export error:', error);
            toast.error('Error exporting file');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Promotion Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }} onClick={handleExportExcel}>
                    <Download />
                </IconButton>
            </Box>

            {/* Statistic */}
            <Statistic promotionData={promotionData} />

            {/* Promotion Table */}
            {!isLoading ? (
                <PromotionTable promotionData={promotionData} onPageChange={handlePageChange} />
            ) : (
                <PromotionTableSkeleton />
            )}
        </Box>
    )
}

export default PromotionManagement
import { Box, Typography, IconButton } from "@mui/material"
import { Notifications } from "@mui/icons-material"
import Statistic from "./components/Statistic"
import PromotionTable from "./components/PromotionTable"
import { useGetPromotionsQuery } from "../../apis/promotionApi"
import React from "react"
import PromotionTableSkeleton from "./components/PromotionTableSkeleton"

const PromotionManagement = () => {
    const [page, setPage] = React.useState(1)
    const { data: promotionData, isLoading } = useGetPromotionsQuery({ page: page, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' })
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Promotion Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                    <Notifications />
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
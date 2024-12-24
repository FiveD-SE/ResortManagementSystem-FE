import { Notifications } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import Statistic from "./components/Statistic"
import Revenue from "./components/Revenue"
import RevenueByServiceType from "./components/RevenueByServiceType"
import RevenueByRoomType from "./components/RevenueByRoomType"

const AdminDashboard = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Dashboard</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                    <Notifications />
                </IconButton>
            </Box>

            {/* Statistic Section */}
            <Statistic />

            {/* Revenue Section */}
            <Revenue />

            {/* Revenue By Order */}
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 4 }}>
                <RevenueByServiceType />
                <RevenueByRoomType />
            </Box>
        </Box>
    )
}

export default AdminDashboard
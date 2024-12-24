import { Notifications } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import Statistic from "./components/Statistic"
import StaffTable from "./components/StaffTable"

const StaffManagement = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Staff Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                    <Notifications />
                </IconButton>
            </Box>

            {/* Statistic Section */}
            <Statistic />
            {/* Staff Table */}
            <StaffTable />
        </Box>
    )
}

export default StaffManagement
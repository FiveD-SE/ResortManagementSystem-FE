import { Notifications } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import StatisticRoomType from "./components/StatisticRoomType"
import RoomTable from "./components/RoomTable"
import React from "react"
import RoomTypeManagement from "./components/RoomTypeManagement"

const RoomManagement = () => {
    const [disable, setDisable] = React.useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Room Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                    <Notifications />
                </IconButton>
            </Box>

            {!disable ? (
                <Box>
                    <StatisticRoomType onManageRoomType={() => setDisable(!disable)} />
                    <RoomTable />
                </Box>
            ) : (
                <RoomTypeManagement onManageRoomType={() => setDisable(!disable)} />
            )}
        </Box>
    )
}

export default RoomManagement
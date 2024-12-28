import { Notifications } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import StatisticRoomType from "./components/StatisticRoomType"
import RoomTable from "./components/RoomTable"
import React from "react"
import RoomTypeManagement from "./components/RoomTypeManagement"
import EditRoomType from "./components/EditRoomType"
import AddNewRoomType from "./components/AddNewRoomType"
import { useGetRoomsQuery } from "../../apis/roomApi"
import { useGetRoomTypesQuery } from "../../apis/roomTypeApi"
import { IRoomType } from "../../types"

const RoomManagement = () => {
    const [viewMode, setViewMode] = React.useState<'default' | 'roomManagement' | 'addRoomType' | 'editRoomType'>('default');
    const [selectedRoomType, setSelectedRoomType] = React.useState<IRoomType>();
    const { data: roomsData } = useGetRoomsQuery();
    const { data: roomTypesData } = useGetRoomTypesQuery();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Room Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                    <Notifications />
                </IconButton>
            </Box>

            {viewMode === 'default' && (
                <>
                    <StatisticRoomType onManageRoomType={() => setViewMode('roomManagement')} roomsData={roomsData} roomTypesData={roomTypesData} />
                    <RoomTable roomsData={roomsData} roomTypesData={roomTypesData} />
                </>
            )}

            {viewMode === 'roomManagement' && (
                <RoomTypeManagement
                    onManageRoomType={() => setViewMode('default')}
                    onAddNewRoomType={() => setViewMode('addRoomType')}
                    onEditRoomType={(roomType) => {
                        setSelectedRoomType(roomType);
                        setViewMode('editRoomType');
                    }}
                    roomTypesData={roomTypesData}
                />
            )}

            {viewMode === 'editRoomType' && (
                <EditRoomType
                    roomType={selectedRoomType}
                    onEditRoomType={() => setViewMode('roomManagement')}
                />
            )}


            {viewMode === 'addRoomType' && (
                <AddNewRoomType onAddNewRoomType={() => setViewMode('roomManagement')} />
            )}
        </Box>
    );
}


export default RoomManagement
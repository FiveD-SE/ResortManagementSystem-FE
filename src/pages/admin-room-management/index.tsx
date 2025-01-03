import { Download } from "@mui/icons-material"
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
import RoomTableSkeleton from "./components/RoomTableSkeleton"
import StatisticRoomTypeSkeleton from "./components/StatisticRoomTypeSkeletion"
import { useGetRoomCountByRoomTypeQuery } from "../../apis/adminDashboardApi"
import { useExportRoomExcelMutation } from "../../apis/exportApi"
import toast from "react-hot-toast"

const RoomManagement = () => {
    const [viewMode, setViewMode] = React.useState<'default' | 'roomManagement' | 'addRoomType' | 'editRoomType'>('default');
    const [selectedRoomType, setSelectedRoomType] = React.useState<IRoomType>();
    const { data: roomsData, isLoading: roomLoading } = useGetRoomsQuery({ page: 1, limit: 100 });
    const { data: roomTypesData } = useGetRoomTypesQuery({ page: 1, limit: 100 });
    const { data: roomTypesStatistic, isLoading: roomTypesStatisticLoading } = useGetRoomCountByRoomTypeQuery();

    const [exportExcel] = useExportRoomExcelMutation();

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
                <Typography variant='h4' sx={{ color: 'black.900' }}>Room Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }} onClick={handleExportExcel}>
                    <Download />
                </IconButton>
            </Box>

            {viewMode === 'default' && (
                <>
                    {roomTypesStatisticLoading ? (
                        <StatisticRoomTypeSkeleton />
                    ) : (
                        <StatisticRoomType onManageRoomType={() => setViewMode('roomManagement')} roomTypesStatistic={roomTypesStatistic} />
                    )}
                    {roomLoading ? (
                        <RoomTableSkeleton />
                    ) : (
                        <RoomTable roomsData={roomsData} roomTypesData={roomTypesData} />
                    )}
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
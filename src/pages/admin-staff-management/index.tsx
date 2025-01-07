import { Download } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import Statistic from "./components/Statistic"
import StaffTable from "./components/StaffTable"
import { useAdminGetUsersByRoleQuery } from "../../apis/userApi"
import { Role, UserSortBy } from "../../types"
import React from "react"
import StaffTableSkeleton from "./components/StaffTableSkeleton"
import toast from "react-hot-toast"
import { useExportStaffExcelMutation } from "../../apis/exportApi"

const StaffManagement = () => {
    const [page, setPage] = React.useState<number>(1)
    const {
        data: ReceptionistData,
        isLoading: isLoadingReceptionist,
        refetch: refetchReceptionist
    } = useAdminGetUsersByRoleQuery({ role: Role.Receptionist, sortOrder: 'asc', sortBy: UserSortBy.FirstName, page: page, limit: 10 })
    const {
        data: ServiceStaffData,
        isLoading: isLoadingServiceStaff,
        refetch: refetchServiceStaff
    } = useAdminGetUsersByRoleQuery({ role: Role.ServiceStaff, sortOrder: 'asc', sortBy: UserSortBy.FirstName, page: page, limit: 10 })
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }
    const handleRefresh = () => {
        refetchReceptionist()
        refetchServiceStaff()
    }

    const [exportExcel] = useExportStaffExcelMutation();

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
                <Typography variant='h4' sx={{ color: 'black.900' }}>Staff Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }} onClick={handleExportExcel}>
                    <Download />
                </IconButton>
            </Box>
            {/* Statistic Section */}
            <Statistic />
            {/* Staff Table */}
            {isLoadingReceptionist || isLoadingServiceStaff ? (
                <StaffTableSkeleton />
            ) : (
                <StaffTable
                    ReceptionistData={ReceptionistData}
                    ServiceStaffData={ServiceStaffData}
                    onChangePage={handlePageChange}
                    onRefresh={handleRefresh}
                />
            )}
        </Box>
    )
}

export default StaffManagement
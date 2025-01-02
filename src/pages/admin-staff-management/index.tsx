import { Notifications } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import Statistic from "./components/Statistic"
import StaffTable from "./components/StaffTable"
import { useAdminGetUsersByRoleQuery } from "../../apis/userApi"
import { Role, UserSortBy } from "../../types"
import React from "react"
import StaffTableSkeleton from "./components/StaffTableSkeleton"

const StaffManagement = () => {
    const [page, setPage] = React.useState<number>(1)
    const { data: ReceptionistData, isLoading: isLoadingReceptionist } = useAdminGetUsersByRoleQuery({ role: Role.Receptionist, sortOrder: 'asc', sortBy: UserSortBy.FirstName, page: page, limit: 10 })
    const { data: ServiceStaffData, isLoading: isLoadingServiceStaff } = useAdminGetUsersByRoleQuery({ role: Role.ServiceStaff, sortOrder: 'asc', sortBy: UserSortBy.FirstName, page: page, limit: 10 })
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }
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
            {isLoadingReceptionist || isLoadingServiceStaff ? (
                <StaffTableSkeleton />
            ) : (
                <StaffTable
                    ReceptionistData={ReceptionistData}
                    ServiceStaffData={ServiceStaffData}
                    onChangePage={handlePageChange}
                />
            )}
        </Box>
    )
}

export default StaffManagement
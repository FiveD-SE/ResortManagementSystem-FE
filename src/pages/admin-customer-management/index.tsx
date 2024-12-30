import { Notifications } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import CustomerTable from "./components/CustomerTable"
import { useAdminGetUsersByRoleQuery } from "../../apis/userApi"
import { Role, UserSortBy } from "../../types"
import React from "react"

const CustomerManagement = () => {
    const [page, setPage] = React.useState<number>(1)
    const { data: CustomerData, isLoading } = useAdminGetUsersByRoleQuery({ role: Role.User, sortOrder: 'asc', sortBy: UserSortBy.FirstName, page: page, limit: 10 })
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Customer Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                    <Notifications />
                </IconButton>
            </Box>
            <CustomerTable CustomerData={CustomerData} isLoading={isLoading} onPageChange={handlePageChange} />
        </Box>
    )
}

export default CustomerManagement
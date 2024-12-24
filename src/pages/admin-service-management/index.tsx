import { Notifications } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import StatisticServiceType from "./components/StatisticServiceType"
import ServiceTable from "./components/ServiceTable"
import ServiceTypeManagement from "./components/ServiceTypeManagement"
import React from "react"

const ServiceManagement = () => {
    const [disable, setDisable] = React.useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' sx={{ color: 'black.900' }}>Sercice Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }}>
                    <Notifications />
                </IconButton>
            </Box>

            {!disable ? (
                <Box>
                    <StatisticServiceType onManageServiceType={() => setDisable(!disable)} />
                    <ServiceTable />
                </Box>
            ) : (
                <ServiceTypeManagement onManageServiceType={() => setDisable(!disable)} />
            )}
        </Box>
    )
}

export default ServiceManagement
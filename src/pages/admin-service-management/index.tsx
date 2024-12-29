import { Notifications } from "@mui/icons-material"
import { Box, IconButton, Typography, Skeleton } from "@mui/material"
import StatisticServiceType from "./components/StatisticServiceType"
import ServiceTable from "./components/ServiceTable"
import ServiceTypeManagement from "./components/ServiceTypeManagement"
import React from "react"
import { useGetServicesQuery } from "../../apis/serviceApi"
import { useGetServiceTypesQuery } from "../../apis/serviceTypeApi"
import StatisticServiceTypeSkeleton from "./components/StatisticServiceTypeSkeleton"
import ServiceTableSkeleton from "./components/ServiceTableSkeleton"

const ServiceManagement = () => {
    const [disable, setDisable] = React.useState(false);
    const [servicePage, setServicePage] = React.useState(1);
    const [serviceTypePage, setServiceTypePage] = React.useState(1);
    const { data: serviceData, isLoading: serviceLoading } = useGetServicesQuery({
        page: servicePage,
        limit: 10,
        sort: 'asc'
    });
    const { data: serviceTypeData, isLoading: serviceTypeLoading } = useGetServiceTypesQuery({
        page: serviceTypePage,
        limit: 10,
        sort: 'asc'
    });

    const handleServicePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setServicePage(value);
    }

    const handleServiceTypePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setServiceTypePage(value);
    }

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
                    {!serviceTypeLoading ? (
                        <StatisticServiceType
                            onManageServiceType={() => setDisable(!disable)}
                            serviceData={serviceData}
                            serviceTypeData={serviceTypeData}
                        />
                    ) : (
                        <StatisticServiceTypeSkeleton />
                    )}
                    {!serviceLoading ? (
                        <ServiceTable
                            serviceData={serviceData}
                            serviceTypeData={serviceTypeData}
                            onPageChange={handleServicePageChange}
                        />
                    ) : (
                        <ServiceTableSkeleton />
                    )}
                </Box>
            ) : (
                <ServiceTypeManagement
                    onManageServiceType={() => setDisable(!disable)}
                    serviceData={serviceData}
                    serviceTypeData={serviceTypeData}
                    onPageChange={handleServiceTypePageChange}
                />
            )}
        </Box>
    )
}

export default ServiceManagement
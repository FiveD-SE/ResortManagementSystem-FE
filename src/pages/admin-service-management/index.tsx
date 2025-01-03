import { Download } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import StatisticServiceType from "./components/StatisticServiceType"
import ServiceTable from "./components/ServiceTable"
import ServiceTypeManagement from "./components/ServiceTypeManagement"
import React from "react"
import { useGetServicesQuery } from "../../apis/serviceApi"
import { useGetServiceTypesQuery } from "../../apis/serviceTypeApi"
import StatisticServiceTypeSkeleton from "./components/StatisticServiceTypeSkeleton"
import ServiceTableSkeleton from "./components/ServiceTableSkeleton"
import { useGetServiceCountByServiceTypeQuery } from "../../apis/adminDashboardApi"
import { useExportServiceExcelMutation } from "../../apis/exportApi"
import toast from "react-hot-toast"

const ServiceManagement = () => {
    const [disable, setDisable] = React.useState(false);
    const [servicePage, setServicePage] = React.useState(1);
    const [serviceTypePage, setServiceTypePage] = React.useState(1);
    const { data: serviceData, isLoading: serviceLoading } = useGetServicesQuery({
        page: servicePage,
        limit: 10,
        sort: 'asc'
    });
    const { data: serviceTypeData } = useGetServiceTypesQuery({
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

    const { data: serviceTypesStatistic, isLoading: serviceTypesStatisticLoading } = useGetServiceCountByServiceTypeQuery();

    const [exportExcel] = useExportServiceExcelMutation();

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
                <Typography variant='h4' sx={{ color: 'black.900' }}>Sercice Management</Typography>
                <IconButton size='small' sx={{ color: 'black.900', ":hover": { color: 'white.50', bgcolor: 'primary.500', transition: 'ease-in-out 0.3s' } }} onClick={handleExportExcel}>
                    <Download />
                </IconButton>
            </Box>

            {!disable ? (
                <Box>
                    {!serviceTypesStatisticLoading ? (
                        <StatisticServiceType
                            onManageServiceType={() => setDisable(!disable)}
                            serviceTypesStatistic={serviceTypesStatistic}
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
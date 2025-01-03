import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IServiceRevenue } from '../../../types/statistic';

interface IRevenueByServiceTypeProps {
    serviceRevenue: IServiceRevenue[] | undefined;
}

const RevenueByServiceType = ({ serviceRevenue }: IRevenueByServiceTypeProps) => {
    if (!serviceRevenue || serviceRevenue.length === 0) return null;

    const data = serviceRevenue.map((item) => {
        const { year, services } = item;
        return {
            year,
            ...services,
        };
    });

    const filteredData = data?.slice(-4);

    const formatRevenue = (value: number) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M$`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k$`;
        }
        return `${value}$`;
    };

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            {/* Title */}
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'left' }}>
                Revenue by service type
            </Typography>

            {/* Content */}
            <Box sx={{ flexGrow: 1, width: '100%', height: 400 }}>
                <ResponsiveContainer width="100%">
                    <BarChart data={filteredData}>
                        <XAxis
                            dataKey="year"
                            tick={{ dy: 8, fill: '#000000' }}
                            fontSize={16}
                            fontWeight={600}
                            tickLine={{ stroke: '#000000', strokeWidth: 1 }}
                            domain={['dataMin', 'dataMax']}
                        />
                        <YAxis
                            tick={{ dx: -8, fill: '#000000' }}
                            fontSize={16}
                            fontWeight={600}
                            tickLine={{ stroke: '#000000', strokeWidth: 1 }}
                            tickFormatter={(value) => formatRevenue(value)}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#FFFFFF',
                                color: '#000000',
                                gap: 8,
                            }}
                            labelStyle={{ fontSize: '18px', fontWeight: 600 }}
                            itemStyle={{
                                fontSize: '16px',
                                fontWeight: 500,
                                color: '#000000',
                            }}
                            labelFormatter={(value) => `${value}`}
                            formatter={(value) => `$${value}`}
                        />
                        <Legend
                            verticalAlign="middle"
                            align="right"
                            iconType="square"
                            layout="vertical"
                            content={(props: any) => {
                                const { payload } = props;
                                return (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                                        {payload.map((entry: any, index: number) => (
                                            <Box
                                                key={`item-${index}`}
                                                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 16,
                                                        height: 16,
                                                        backgroundColor: entry.color,
                                                    }}
                                                />
                                                <Typography variant="body1">{entry.value}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                );
                            }}
                        />
                        {data &&
                            Object.keys(data[0]).slice(1, 4).map((key, index) => (
                                <Bar
                                    key={`bar-${key}-${filteredData?.[0]?.year}-${index}`}
                                    dataKey={key}
                                    fill={index === 0 ? '#F6D7DF' : index === 1 ? '#222222' : '#F6475F'}
                                    name={key}
                                />
                            ))}
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default RevenueByServiceType;

import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueByServiceType = () => {
    const data = [
        { year: '2022', laundry: 10, sauna: 7, hotSpring: 15 },
        { year: '2023', laundry: 12, sauna: 6, hotSpring: 20 },
        { year: '2024', laundry: 9, sauna: 8, hotSpring: 18 },
    ];

    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: '100%', justifyContent: 'center' }}>
            {/* Title */}
            <Typography variant="h4" sx={{ mb: 4, textAlign: "left" }}>
                Revenue by service type
            </Typography>

            {/* Content */}
            <Box sx={{ flexGrow: 1, width: "100%", height: 400 }}>
                <ResponsiveContainer width="100%">
                    <BarChart
                        data={data}
                    >
                        <XAxis
                            dataKey="year"
                            tick={{ dy: 8, fill: '#000000' }}
                            fontSize={16}
                            fontWeight={600}
                            tickLine={{ stroke: '#000000', strokeWidth: 1 }}
                        />
                        <YAxis
                            tick={{ dx: -8, fill: '#000000' }}
                            fontSize={16}
                            fontWeight={600}
                            tickLine={{ stroke: '#000000', strokeWidth: 1 }}
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
                                            <Box key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ width: 16, height: 16, backgroundColor: entry.color }} />
                                                <Typography variant="body1">{entry.value}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                );
                            }}
                        />
                        <Bar
                            dataKey="laundry"
                            fill={'#F6D7DF'}
                            name={"Laundry"}
                        />
                        <Bar
                            dataKey="sauna"
                            fill={'#222222'}
                            name={"Sauna"}
                        />
                        <Bar
                            dataKey="hotSpring"
                            fill={'#F6475F'}
                            name={"Hot Spring"}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default RevenueByServiceType;
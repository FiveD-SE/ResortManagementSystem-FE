import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface RevenueData {
    month: string;
    lastYear: number;
    thisYear: number;
}

const Revenue: React.FC = () => {
    const fakeData: RevenueData[] = [
        { month: "January", lastYear: 500000000, thisYear: 600000000 },
        { month: "February", lastYear: 450000000, thisYear: 580000000 },
        { month: "March", lastYear: 470000000, thisYear: 620000000 },
        { month: "April", lastYear: 520000000, thisYear: 650000000 },
        { month: "May", lastYear: 480000000, thisYear: 700000000 },
        { month: "June", lastYear: 510000000, thisYear: 730000000 },
        { month: "July", lastYear: 490000000, thisYear: 750000000 },
        { month: "August", lastYear: 530000000, thisYear: 770000000 },
        { month: "September", lastYear: 550000000, thisYear: 800000000 },
        { month: "October", lastYear: 560000000, thisYear: 820000000 },
        { month: "November", lastYear: 570000000, thisYear: 850000000 },
        { month: "December", lastYear: 600000000, thisYear: 900000000 },
    ];

    const formatValue = (value: number): string => {
        if (value >= 1_000_000_000) {
            return `${(value / 1_000_000_000)} bilion`;
        } else if (value >= 1_000_000) {
            return `${(value / 1_000_000)} milion`;
        } else if (value >= 1_000) {
            return `${(value / 1_000)} thousand`;
        }
        return `${value}`;
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: "left" }}>
                Revenue
            </Typography>
            <Box sx={{ flexGrow: 1, width: "100%", height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={fakeData}>
                        <defs>
                            <linearGradient
                                id="colorUv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#000000"
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#000000"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id="colorPv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#FF385C"
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#FF385C"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="month"
                            tick={{ dy: 8, fill: '#000000' }}
                            fontSize={16}
                            fontWeight={500}
                            stroke="#000000"
                            tickLine={{ stroke: '#000000', strokeWidth: 1 }}
                        />
                        <YAxis
                            tick={{ dx: -8, fill: '#000000' }}
                            fontSize={16}
                            fontWeight={500}
                            stroke="#000000"
                            tickLine={{ stroke: '#000000', strokeWidth: 1 }}
                            tickFormatter={formatValue}
                        />
                        <Tooltip
                            cursor={{ stroke: '#000000', strokeWidth: 1 }}
                            contentStyle={{
                                backgroundColor: '#FFFFFF',
                                color: '#000000',
                                gap: 8,
                            }}
                            labelStyle={{ fontSize: "18px", fontWeight: 600 }}
                            itemStyle={{ fontSize: "16px", fontWeight: 500 }}
                            labelFormatter={(value) =>
                                `Revenue ${value.toLowerCase()}`
                            }
                            formatter={(value: number) => formatValue(value)}
                        />
                        <Legend
                            verticalAlign="middle"
                            align="right"
                            iconType="plainline"
                            layout="vertical"
                            wrapperStyle={{
                                fontSize: "16px",
                                fontWeight: 500,
                                paddingLeft: "16px",
                            }}
                            content={() => {
                                return (
                                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                                        <Box
                                            key={`item-1`}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 2,
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 1,
                                                    backgroundColor: '#FF385C',
                                                }}
                                            />

                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <Typography variant="body1" color="#000000" fontWeight={600}>$125.900</Typography>
                                                <Typography variant="body2" color="#C2C2C2">This year</Typography>
                                            </Box>
                                        </Box>

                                        <Divider
                                            orientation="vertical"
                                            sx={{
                                                backgroundColor: '#D9D9D9',
                                                height: '30px',
                                                width: '2px',
                                                margin: '16px 0',
                                            }}
                                        />

                                        <Box
                                            key={`item-2`}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: 2,
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 1,
                                                    backgroundColor: '#000000',
                                                }}
                                            />
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <Typography variant="body1" color="#000000" fontWeight={600}>$125.900</Typography>
                                                <Typography variant="body2" color="#C2C2C2">Last year</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="lastYear"
                            stroke="#000000"
                            strokeWidth={2}
                            name="Last year"
                            fill="url(#colorUv)"
                        />
                        <Area
                            type="monotone"
                            dataKey="thisYear"
                            stroke="#FF385C"
                            strokeWidth={2}
                            name="This year"
                            fill="url(#colorPv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default Revenue;

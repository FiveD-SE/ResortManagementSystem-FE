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
import { IYearlyRevenue } from "../../../types/statistic";
import { formatPrice } from "../../../utils";

interface RevenueData {
    month: string;
    lastYear: number;
    thisYear: number;
}

interface RevenueProps {
    yearlyRevenue: IYearlyRevenue | undefined;
}

const Revenue = ({ yearlyRevenue }: RevenueProps) => {
    if (!yearlyRevenue) return null;

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const data: RevenueData[] = months.map((month, index) => ({
        month,
        lastYear: yearlyRevenue.lastYearMonthlyRevenue[index],
        thisYear: yearlyRevenue.currentYearMonthlyRevenue[index]
    }));

    const formatValue = (value: number): string => {
        if (value >= 1_000_000_000) {
            return `${(value / 1_000_000_000)}B`;
        } else if (value >= 1_000_000) {
            return `${(value / 1_000_000)}M`;
        } else if (value >= 1_000) {
            return `${(value / 1_000)}K`;
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
                    <AreaChart data={data}>
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
                            tickFormatter={(value) => formatValue(value)}
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
                            formatter={(value: number) => formatPrice(value)}
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
                                                <Typography variant="body1" color="#000000" fontWeight={600}>{formatPrice(yearlyRevenue?.currentYearRevenue)}</Typography>
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
                                                <Typography variant="body1" color="#000000" fontWeight={600}>{formatPrice(yearlyRevenue?.lastYearRevenue)}</Typography>
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

export interface IRevenue {
    revenue: number;
    growth: number;
}

export interface ICustomerGrowth {
    customers: number;
    growth: number;
}

export interface IRoomAvailability {
    availableRooms: number;
    bookedRooms: number;
    totalRooms: number;
}

export interface IServiceRevenue {
    year: number;
    services: {
        [key: string]: number;
    }
}

export interface IRoomTypeRevenue {
    roomType: string;
    revenue: number;
}

export interface IYearlyRevenue {
    currentYearRevenue: number;
    lastYearRevenue: number;
    currentYearMonthlyRevenue: number[];
    lastYearMonthlyRevenue: number[];
    growth: number;
}
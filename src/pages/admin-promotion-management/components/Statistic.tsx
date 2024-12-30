import { Box } from "@mui/material"
import StatisticBox from "./StatisticBox"
import { IPromotionApiResponse } from "../../../types"
import React from "react";
import StatisticBoxSkeleton from "./StatisticBoxSkeleton";
interface StatisticProps {
    promotionData: IPromotionApiResponse | undefined;
}
const Statistic = ({ promotionData }: StatisticProps) => {
    const [statistic, setStatistic] = React.useState({ active: 0, inactive: 0, expired: 0 });
    React.useEffect(() => {
        if (promotionData) {
            const now = new Date();
            const active = promotionData.docs.filter(promotion => new Date(promotion.startDate) < now && new Date(promotion.endDate) > now).length
            const inactive = promotionData.docs.filter(promotion => new Date(promotion.startDate) > now).length
            const expired = promotionData.docs.filter(promotion => new Date(promotion.endDate) < now).length
            setStatistic({ active, inactive, expired })
        }
    }, [promotionData])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {promotionData ? (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                    <StatisticBox title='Active' value={statistic?.active} />
                    <StatisticBox title='Inactive' value={statistic?.inactive} />
                    <StatisticBox title='Expired' value={statistic?.expired} />
                </Box>
            ) : (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                    <StatisticBoxSkeleton />
                    <StatisticBoxSkeleton />
                    <StatisticBoxSkeleton />
                </Box>
            )}
        </Box>
    )
}

export default Statistic
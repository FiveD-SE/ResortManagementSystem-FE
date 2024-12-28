import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react'

interface KeyFeature {
    title: string;
    icon: React.ElementType;
    description: string;
    selected: boolean;
    onSelected: () => void;
}

const KeyFeatureItem = ({ title, icon, description, selected, onSelected }: KeyFeature) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 1 }} onClick={onSelected}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {React.createElement(icon)}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingX: 2 }}>
                    <Typography sx={{ color: 'black.900', fontSize: 14, fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <Typography sx={{ color: 'black.200', fontSize: 12, fontWeight: 500 }}>
                        {description}
                    </Typography>
                </Box>
            </Box>
            <IconButton sx={{ padding: 0 }}>
                {selected ? <CheckBox /> : <CheckBoxOutlineBlank />}
            </IconButton>
        </Box>
    )
}

export default KeyFeatureItem
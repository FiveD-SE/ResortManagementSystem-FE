import React from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

interface Amenity {
    title: string;
    icon: React.ElementType;
    selected: boolean;
    onSelected: () => void;
}

const AmenityItem = ({ title, icon, selected, onSelected }: Amenity) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1 }} onClick={onSelected}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {React.createElement(icon)}
                <Typography sx={{ color: 'black.900', fontSize: 14, fontWeight: 500 }}>
                    {title}
                </Typography>
            </Box>
            <IconButton sx={{ padding: 0 }}>
                {selected ? <CheckBox /> : <CheckBoxOutlineBlank />}
            </IconButton>
        </Box>
    )
}

export default AmenityItem

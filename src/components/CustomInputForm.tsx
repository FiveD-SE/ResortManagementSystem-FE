import { Box, TextField, Typography } from '@mui/material';
import React from 'react'

interface CustomInputFormProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
}

const CustomInputForm = ({ label, placeholder, value, onChange, type, error = false, helperText = '', disabled }: CustomInputFormProps) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (type === 'number' && Number(value) < 0) e.target.value = '';
    };

    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
        if (type === 'number') (e.target as HTMLInputElement).blur();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ color: 'black.900', fontSize: 16, fontWeight: 500 }}>
                {label}
            </Typography>

            <TextField
                fullWidth
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type={type}
                error={error}
                helperText={helperText}
                onInput={handleInput}
                onWheel={handleWheel}
                disabled={disabled}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: 2,
                        '& fieldset': {
                            borderColor: error ? 'red' : 'gray.100',
                        },
                        '&:hover fieldset': {
                            borderColor: error ? 'red' : 'black.900',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: error ? 'red' : 'black.900',
                            borderWidth: 1,
                        },
                        '& .MuiInputBase-input': {
                            fontSize: 16,
                        },
                    },
                    '& input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                }}
            />
        </Box>
    )
}

export default CustomInputForm;

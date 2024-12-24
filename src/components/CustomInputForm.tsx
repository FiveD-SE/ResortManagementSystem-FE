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
}

const CustomInputForm = ({ label, placeholder, value, onChange, type, error = false, helperText = '' }: CustomInputFormProps) => {
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
                }}
            />
        </Box>
    )
}

export default CustomInputForm;

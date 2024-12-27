import React from "react";
import { Box, TextField, Typography, Autocomplete } from "@mui/material";

interface CustomSelectingFormProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options: string[];
}

const CustomSelectingForm = ({ label, placeholder, value, onChange, options }: CustomSelectingFormProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ color: 'black.900', fontSize: 16, fontWeight: 500 }}>
                {label}
            </Typography>

            <Autocomplete
                freeSolo
                options={options}
                value={value}
                onInputChange={(_event, newInputValue) => {
                    onChange({
                        target: { value: newInputValue } as HTMLInputElement,
                    } as React.ChangeEvent<HTMLInputElement>);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: 2,
                                '& fieldset': {
                                    borderColor: 'gray.100',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black.900',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black.900',
                                    borderWidth: 1,
                                },
                                '& .MuiInputBase-input': {
                                    fontSize: 16,
                                },
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
}

export default CustomSelectingForm
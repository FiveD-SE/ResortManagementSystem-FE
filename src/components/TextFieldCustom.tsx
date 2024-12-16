import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface TextFieldCustomProps {
    title?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: any) => void;
    type?: string;
}

const iconStyle = {
    color: 'gray.400',
    fontSize: 24,
};

const TextFieldCustom = ({ title, placeholder, value, onChange, type = 'text' }: TextFieldCustomProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === 'password' && !showPassword ? 'password' : 'text';

    const inputProps = type === 'password' ? {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                >
                    {showPassword ? <VisibilityOff sx={iconStyle} /> : <Visibility sx={iconStyle} />}
                </IconButton>
            </InputAdornment>
        )
    } : {};

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 1
            }}
        >
            {/* Title */}
            <Typography
                sx={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: 'black.900'
                }}
            >
                {title}
            </Typography>
            {/* Text Field */}
            <TextField
                fullWidth
                variant={'outlined'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type={inputType}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        height: '56px'
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '12px 16px'
                    },
                    '& .MuiInputLabel-root': {
                        color: 'gray.500'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'black.900'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'gray.200'
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black.900'
                    },
                    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.500'
                    },
                }}
                InputProps={inputProps}
            />
        </Box>
    );
};

export default TextFieldCustom;

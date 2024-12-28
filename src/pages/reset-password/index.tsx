import { Box, Button, Typography } from '@mui/material'
import TextFieldCustom from '../../components/TextFieldCustom';
import React from 'react'

const ResetPassword = () => {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'white.50' }}>
            <Box sx={{ width: { xs: '90vw', sm: '50vw' }, bgcolor: 'white.50', padding: '60px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.1)' }}>
                <Typography fontSize={45} fontWeight={600} color={'primary.500'}>
                    BRAND
                    <Typography fontSize={45} fontWeight={600} color={'black.900'} component={'span'}>
                        NAME
                    </Typography>
                </Typography>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'flex-start'}
                    gap={1}
                    marginBottom={4}
                    marginTop={2}
                >
                    <Typography fontSize={32} fontWeight={600} color={'black.900'}>
                        Reset password
                    </Typography>
                    <Typography fontSize={16} fontWeight={400} color={'gray.300'}>
                        Create a new password. Ensure your new password differs from your old one for security.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                    <TextFieldCustom
                        title={'Password'}
                        placeholder={'Enter your new password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                    />

                    <TextFieldCustom
                        title={'Confirm password'}
                        placeholder={'Enter your confirm password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={'password'}
                    />
                </Box>

                <Button
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontSize: 18,
                        fontWeight: 600,
                        color: 'white.50',
                        bgcolor: 'primary.500',
                        marginTop: 4
                    }}
                >
                    Confirm
                </Button>
            </Box>
        </Box>
    )
}

export default ResetPassword
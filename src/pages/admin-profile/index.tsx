import { Avatar, Box, Button, Typography } from "@mui/material"
import CustomInputForm from "../../components/CustomInputForm"
import React from "react"

const AdminProfile = () => {
    const [fullName, setFullName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [phone, setPhone] = React.useState<string>('')
    const [address, setAddress] = React.useState<string>('')
    const [avatar, setAvatar] = React.useState<File>()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header Cover */}
            <Box
                sx={{
                    display: 'flex',
                    height: '20vh',
                    bgcolor: 'primary.500',
                    background: 'linear-gradient(90deg, rgba(255, 99, 132, 1) 0%, rgba(54, 162, 235, 1) 100%)',
                }}
            />
            {/* Content */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginX: 4, gap: 1 }}>
                    <label htmlFor="avatar">
                        <Avatar
                            sx={{ width: 150, height: 150, marginTop: -10, color: 'white.50', bgcolor: 'primary.500', cursor: 'pointer', ":hover": { scale: 1.01 } }}
                            src={avatar ? URL.createObjectURL(avatar) : ''}
                        />
                    </label>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 2, gap: 2 }}>
                        <Typography sx={{ fontSize: 24, fontWeight: 600, color: 'black.900' }}>Nguyen Thanh Tai</Typography>
                        <Typography sx={{ padding: '4px 16px', border: '1px solid', borderRadius: '16px', fontSize: 14, fontWeight: 600, borderColor: 'primary.500', color: 'primary.500' }}>Admin</Typography>
                    </Box>
                    <Typography sx={{ fontSize: 18, fontWeight: 400, color: 'black.300' }}>nguyenthanhtai@gmail.com</Typography>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => setAvatar(e.target.files?.[0])}
                        style={{ display: 'none' }}
                        id='avatar'
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginX: 4, marginTop: 4 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <CustomInputForm
                            label='Full name'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder='Enter your full name'
                            type="text"
                        />
                        <CustomInputForm
                            label='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            type="email"
                            error={!!email && !/^\S+@\S+\.\S+$/.test(email)}
                            helperText={email && !/^\S+@\S+\.\S+$/.test(email) ? 'Invalid email address' : ''}
                        />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                        <CustomInputForm
                            label='Phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder='Enter your phone number'
                            type="tel"
                            error={!!phone && !/^\d{10,11}$/.test(phone)}
                            helperText={phone && !/^\d{10,11}$/.test(phone) ? 'Invalid phone number' : ''}
                        />
                        <CustomInputForm
                            label='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Enter your address'
                            type="text"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'white.50', color: '#5C5C5C', border: '1px solid #E0E0E0', ":hover": { borderColor: 'black.900' }, borderRadius: 2 }}>
                            Cancel
                        </Button>

                        <Button sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2 }}>
                            Update Profile
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminProfile
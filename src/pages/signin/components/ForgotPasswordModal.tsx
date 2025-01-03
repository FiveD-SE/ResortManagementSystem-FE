import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material"
import TextFieldCustom from "../../../components/TextFieldCustom"
import { useState } from "react";
import { useForgotPasswordMutation } from "../../../apis/authApi";
import toast from "react-hot-toast";
interface ForgotPasswordModalProps {
    open: boolean;
    onClose: () => void;
};

const ForgotPasswordModal = ({ open, onClose }: ForgotPasswordModalProps) => {
    const [email, setEmail] = useState('');

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const handleForgotPassword = async () => {
        if (email === '') {
            toast.error('Please enter your email');
            return;
        }
        const response = await forgotPassword({ email });
        if (response.error) {
            toast.error('Failed to send email');
            return;
        }
        toast.success('Email sent successfully');
        onClose();
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: { xs: '90vw', sm: '60vw' },
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white.50',
                    padding: '60px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
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
                        Forgot password
                    </Typography>
                    <Typography fontSize={16} fontWeight={400} color={'gray.300'}>
                        Enter your email for the verification process.We will send notification to your email.
                    </Typography>
                </Box>

                <TextFieldCustom
                    title={'Email'}
                    placeholder={'Enter your email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type={'email'}
                />

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
                        marginTop: 4,
                        ":disabled": { color: 'gray.200', bgcolor: 'gray.100' }
                    }}
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} color={'inherit'} /> : 'Reset password'}
                </Button>
            </Box>
        </Modal>
    )
}

export default ForgotPasswordModal
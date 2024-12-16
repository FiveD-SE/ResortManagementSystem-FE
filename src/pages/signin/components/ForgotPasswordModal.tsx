import { Box, Button, Modal, Typography } from "@mui/material"
import TextFieldCustom from "../../../components/TextFieldCustom"
import { useState } from "react";

interface ForgotPasswordModalProps {
    open: boolean;
    onClose: () => void;
};

const ForgotPasswordModal = ({ open, onClose }: ForgotPasswordModalProps) => {
    const [email, setEmail] = useState('');

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
                    width: '60vw',
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
                        height: 56,
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
                    Reset password
                </Button>
            </Box>
        </Modal>
    )
}

export default ForgotPasswordModal
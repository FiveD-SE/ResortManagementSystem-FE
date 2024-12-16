import { useState } from "react"
import { Box, Button, Divider, Link, Typography } from "@mui/material"
import CustomTextField from "../../../components/TextFieldCustom"
import { Google } from "@mui/icons-material";
import ForgotPasswordModal from "./ForgotPasswordModal";

const SignInCard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 10,
                gap: 4,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <Typography
                    sx={{
                        fontSize: 32,
                        fontWeight: 600,
                        color: 'black.900'
                    }}
                >
                    Sign In <br />
                    <Typography
                        sx={{
                            fontSize: 48,
                            fontWeight: 600,
                            color: 'black.900'
                        }}
                    >
                        Brand
                        <Typography
                            component={'span'}
                            sx={{
                                fontSize: 48,
                                fontWeight: 600,
                                color: 'primary.500'
                            }}
                        >
                            Name
                        </Typography>
                    </Typography>
                </Typography>
            </Box>

            {/* Google Login Button */}
            <Button
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: 56,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                    textTransform: 'none',
                    fontSize: 22,
                    fontWeight: 600,
                    color: 'black.900',
                    bgcolor: 'white.50',
                    border: '1px solid',
                    borderColor: 'gray.200',
                    gap: 1,
                    '&:hover': {
                        borderColor: 'gray.500'
                    }
                }}
            >
                <Google sx={{ fontSize: 24 }} />
                <Typography
                    sx={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'black.900'
                    }}
                >
                    Continue with Google
                </Typography>
            </Button>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    gap: 2
                }}
            >
                <Divider
                    sx={{
                        flex: 1,
                        display: 'flex',
                        height: 1,
                        bgcolor: 'gray.200'
                    }}
                />
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: 16,
                        color: 'black.900'
                    }}
                >
                    OR
                </Typography>
                <Divider
                    sx={{
                        flex: 1,
                        display: 'flex',
                        height: 1,
                        bgcolor: 'gray.200'
                    }}
                />
            </Box>

            <CustomTextField
                title={"Email"}
                placeholder={"Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
            />

            <CustomTextField
                title={"Password"}
                placeholder={"Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
            />

            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                <Link
                    sx={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'black.900',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                    onClick={() => setOpen(true)}
                >
                    Forgot your password?
                </Link>
            </Box>

            {/* Button */}
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 2
                }}
            >
                <Button
                    sx={{
                        display: 'flex',
                        width: 306,
                        height: 56,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 12,
                        textTransform: 'none',
                        fontSize: 22,
                        fontWeight: 600,
                        color: 'white.50',
                        bgcolor: 'primary.500',
                        '&:hover': {
                            bgcolor: 'primary.600'
                        },
                        '&:disabled': {
                            bgcolor: 'gray.100',
                            color: 'gray.200'
                        }
                    }}
                >
                    Sign In
                </Button>

                <Typography
                    sx={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'gray.300'
                    }}
                >
                    Don’t have an account? {' '}
                    <Link
                        href={'/signup'}
                        sx={{
                            color: 'black.900',
                            fontWeight: 600,
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Sign up
                    </Link>
                </Typography>
            </Box>
            <ForgotPasswordModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </Box>
    )
}

export default SignInCard
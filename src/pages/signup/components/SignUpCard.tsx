import { useState } from "react"
import { Box, Button, Link, Typography } from "@mui/material"
import CustomTextField from "../../../components/TextFieldCustom"
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

const SignUpCard = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: { xs: '90vw', sm: '50vw' },
                boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
                borderRadius: 6,
                padding: 4,
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '2px',
                    marginBottom: 2
                }}
            >
                <Typography
                    sx={{
                        fontSize: 32,
                        fontWeight: 600,
                        color: 'primary.500'
                    }}
                >
                    Welcome to {' '}
                    <Typography
                        component={'span'}
                        sx={{
                            fontSize: 32,
                            fontWeight: 600,
                            color: 'black.900'
                        }}
                    >
                        Brand Name
                    </Typography>
                </Typography>
                <Typography
                    sx={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: 'gray.300'
                    }}
                >
                    Already have an account? {' '}
                    <Link
                        href={'/signin'}
                        sx={{
                            color: 'black.900',
                            fontWeight: 600,
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Sign in
                    </Link>
                </Typography>
            </Box>

            <CustomTextField
                title={"Email"}
                placeholder={"Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
            />

            <CustomTextField
                title={"Username"}
                placeholder={"Enter your username"}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type={"text"}
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
                    flexDirection: 'column',
                    width: '100%',
                    gap: 3
                }}
            >
                <CustomTextField
                    title={"Confirm Password"}
                    placeholder={"Confirm your password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={"password"}
                />
            </Box>

            {/* Confirm Information Selection */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    gap: 1,
                    marginTop: 2
                }}
                onClick={() => setIsChecked(!isChecked)}
            >
                {isChecked ? <CheckBox /> : <CheckBoxOutlineBlank />}
                <Typography
                    sx={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: 'gray.400',
                        userSelect: 'none'
                    }}
                >
                    I want to receive emails about the product, feature updates, events, and marketing promotions.
                </Typography>
            </Box>

            <Typography
                sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: 'gray.400',
                    userSelect: 'none'
                }}
            >
                By creating an account, you agree to the <Link>Terms of use</Link> and <Link>Privacy Policy</Link>.
            </Typography>

            {/* Button */}
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
            >
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
                        '&:hover': {
                            bgcolor: 'primary.600'
                        },
                        '&:disabled': {
                            bgcolor: 'gray.100',
                            color: 'gray.200'
                        }
                    }}
                >
                    Sign up
                </Button>
            </Box>
        </Box>
    )
}

export default SignUpCard
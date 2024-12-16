import { useState } from "react"
import { Box, Button, Link, Typography } from "@mui/material"
import CustomTextField from "../../../components/TextFieldCustom"
import { CheckBox, CheckBoxOutlineBlank, FiberManualRecord } from "@mui/icons-material";

const recommendations = [
    'Use 8 or more characters',
    'One Uppercase character',
    'One lowercase character',
    'One special character',
    'One number'
];

const SignUpCard = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

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
                    gap: '2px'
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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: 2
                    }}
                >
                    {recommendations.map((recommendation, index) => (
                        <Typography
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 12,
                                fontWeight: 400,
                                color: 'gray.400',
                            }}
                        >
                            <FiberManualRecord sx={{ height: 8, width: 8, marginRight: 1 }} />
                            {recommendation}
                        </Typography>
                    ))}
                </Box>
            </Box>

            {/* Confirm Information Selection */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    gap: 1
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
                        width: 306,
                        height: 64,
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
                    Sign Up
                </Button>
            </Box>
        </Box>
    )
}

export default SignUpCard
import { Box } from "@mui/material";
import SignInCard from "./components/SignInCard";

const SignIn = () => {
    return (
        <Box
            padding={4}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={'100vh'}
        >
            <Box
                position={'absolute'}
                top={24}
                left={24}
                sx={{
                    borderRadius: '50%',
                    width: 50,
                    height: 50,
                    bgcolor: 'primary.500',
                }}
                onClick={() => window.location.href = '/'}
                display={{ xs: 'none', md: 'block' }}
            />
            {/* Sign in Card */}
            <SignInCard />
        </Box>
    );
};

export default SignIn;

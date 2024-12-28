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
            <SignInCard />
        </Box>
    );
};

export default SignIn;

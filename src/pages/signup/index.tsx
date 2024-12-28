import { Box } from "@mui/material";
import SignUpCard from "./components/SignUpCard";

const SignUp = () => {
    return (
        <Box
            padding={4}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={'100vh'}
        >
            <SignUpCard />
        </Box>
    )
}

export default SignUp
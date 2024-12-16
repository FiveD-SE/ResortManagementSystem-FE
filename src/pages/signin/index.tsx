import { Box } from "@mui/material";
import SignInCard from "./components/SignInCard";
import assets from "../../assets";

const SignIn = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Image */}
            <Box
                component="img"
                src={assets.wallpaper}
                alt="wallpaper"
                sx={{
                    flex: 1,
                    display: { xs: 'none', sm: 'block' },
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
            {/* SignIn Card */}
            <SignInCard />
        </Box>
    );
};

export default SignIn;

import { Box } from "@mui/material";
import SignUpCard from "./components/SignUpCard";
import assets from "../../assets";

const SignUp = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* SignUp Card */}
            <SignUpCard />
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
        </Box>
    )
}

export default SignUp
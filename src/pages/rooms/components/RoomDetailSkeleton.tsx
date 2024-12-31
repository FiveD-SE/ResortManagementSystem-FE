import { Box, Skeleton } from '@mui/material';

const RoomDetailSkeleton = () => {
    return (
        <Box display="flex" flexDirection="column" padding={4} gap={4}>
            {/* Tiêu đề */}
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Skeleton width="40%" height="50px" />
                <Skeleton width="10%" height="50px" />
            </Box>

            {/* Khu vực hình ảnh */}
            <Box display="flex" flexDirection="row" gap={2}>
                {/* Ảnh lớn bên trái */}
                <Skeleton variant="rectangular" width="60%" height="300px" sx={{ borderRadius: 1 }} />

                {/* Ảnh nhỏ bên phải */}
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1} width="40%">
                    <Skeleton variant="rectangular" height="145px" sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" height="145px" sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" height="145px" sx={{ borderRadius: 1 }} />
                    <Skeleton variant="rectangular" height="145px" sx={{ borderRadius: 1 }} />
                </Box>
            </Box>

            {/* Mô tả ngắn */}
            <Box display="flex" flexDirection="column">
                <Skeleton width="50%" height="40px" />
                <Skeleton width="70%" height="30px" />
            </Box>

            {/* Chi tiết đặt chỗ */}
            <Box display="flex" flexDirection="row" justifyContent="space-between" gap={1}>
                {/* Thông tin bên trái */}
                <Box display="flex" flexDirection="column" width="60%">
                    <Skeleton width="80%" height="40px" />
                    <Skeleton width="90%" height="40px" />
                    <Skeleton width="70%" height="40px" />
                </Box>

                {/* Giá tiền bên phải */}
                <Box display="flex" flexDirection="column" width="35%">
                    <Skeleton variant="rectangular" width="100%" height="100px" sx={{ borderRadius: 1 }} />
                    <Skeleton width="50%" height="40px" />
                </Box>
            </Box>
        </Box>
    );
};

export default RoomDetailSkeleton;

import React from 'react'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { ArrowBackIosNewRounded } from '@mui/icons-material'
import CustomInputForm from '../../../components/CustomInputForm';
import GroupedAmenities from './GroupedAmenities';
import GroupedKeyFeatures from './GroupedKeyFeatures';
import toast from 'react-hot-toast';
import { IRoomType } from '../../../types';
import { usePatchRoomTypeMutation } from '../../../apis/roomTypeApi';

interface EditRoomTypeProps {
    onEditRoomType: () => void;
    roomType: IRoomType | undefined;
}

const EditRoomType = ({ onEditRoomType, roomType }: EditRoomTypeProps) => {
    const [typeName, setTypeName] = React.useState<string>(roomType?.typeName || '');
    const [basePrice, setBasePrice] = React.useState(roomType?.basePrice.toString() || '');
    const [guestAmount, setGuestAmount] = React.useState(roomType?.guestAmount.toString() || '');
    const [bedroomAmount, setBedroomAmount] = React.useState(roomType?.bedroomAmount.toString() || '');
    const [bedAmount, setBedAmount] = React.useState(roomType?.bedAmount.toString() || '');
    const [sharedBathAmount, setSharedBathAmount] = React.useState(roomType?.sharedBathAmount.toString() || '');
    const [description, setDescription] = React.useState(roomType?.description || '');
    const [amenities, setAmenities] = React.useState<string[]>(roomType?.amenities || []);
    const [keyFeatures, setKeyFeatures] = React.useState<string[]>(roomType?.keyFeatures || []);

    const [patchRoomType, { isLoading }] = usePatchRoomTypeMutation();

    const validateForm = () => {
        if (!typeName) {
            toast.error('Room type name is required');
            return false;
        }
        if (!basePrice) {
            toast.error('Price is required');
            return false;
        }
        if (!guestAmount) {
            toast.error('Guest number is required');
            return false;
        }
        if (!bedroomAmount) {
            toast.error('Bedroom number is required');
            return false;
        }
        if (!bedAmount) {
            toast.error('Bed number is required');
            return false;
        }
        if (!sharedBathAmount) {
            toast.error('Shared bathroom number is required');
            return false;
        }
        if (!description) {
            toast.error('Description is required');
            return false;
        }
        if (amenities.length === 0) {
            toast.error('Amenities is required');
            return false;
        }
        if (keyFeatures.length === 0) {
            toast.error('Key features is required');
            return false;
        }
        return true;
    }

    const handleConfirm = async () => {
        if (!validateForm()) return;

        const data: IRoomType = {
            id: roomType?.id || '',
            typeName,
            basePrice: Number(basePrice),
            guestAmount: Number(guestAmount),
            bedroomAmount: Number(bedroomAmount),
            bedAmount: Number(bedAmount),
            sharedBathAmount: Number(sharedBathAmount),
            description,
            amenities,
            keyFeatures,
        }

        const res = await patchRoomType(data).unwrap();
        if (res) {
            toast.success('Edit room type successfully');
            onEditRoomType();
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
                disableTouchRipple
                sx={{
                    width: 'fit-content',
                    textTransform: 'none',
                    fontSize: 16,
                    fontWeight: 500,
                    color: 'black.200',
                    bgcolor: 'white.50',
                    justifyContent: 'flex-start',
                    padding: 0,
                }}
                startIcon={<ArrowBackIosNewRounded sx={{ width: 20, height: 20 }} />}
                onClick={onEditRoomType}
            >
                Back
            </Button>
            <Typography sx={{ color: 'black.900', fontSize: 20, fontWeight: 600, mb: 2 }}>
                Edit Room Type
            </Typography>

            {/* Form */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4, paddingX: 2 }}>
                <CustomInputForm
                    label="Room Type Name"
                    placeholder="Enter room type name"
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                    type="text"
                />
                <CustomInputForm
                    label="Price"
                    placeholder="Enter price"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    type="number"
                />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4, paddingX: 2 }}>
                <CustomInputForm
                    label="Guest Number"
                    placeholder="Enter guest number"
                    value={guestAmount}
                    onChange={(e) => setGuestAmount(e.target.value)}
                    type="number"
                />
                <CustomInputForm
                    label="Bedroom Number"
                    placeholder="Enter bedroom number"
                    value={bedroomAmount}
                    onChange={(e) => setBedroomAmount(e.target.value)}
                    type="number"
                />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4, paddingX: 2 }}>
                <CustomInputForm
                    label="Bed Number"
                    placeholder="Enter bed number"
                    value={bedAmount}
                    onChange={(e) => setBedAmount(e.target.value)}
                    type="number"
                />
                <CustomInputForm
                    label="Shared Bathroom"
                    placeholder="Enter shared bathroom number"
                    value={sharedBathAmount}
                    onChange={(e) => setSharedBathAmount(e.target.value)}
                    type="number"
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingX: 2 }}>
                <Typography sx={{ color: 'black.900', fontSize: 16, fontWeight: 500 }}>
                    Description
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={5}
                    placeholder={'Enter description'}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: 2,
                            '& fieldset': {
                                borderColor: 'gray.100',
                            },
                            '&:hover fieldset': {
                                borderColor: 'black.900',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black.900',
                                borderWidth: 1,
                            },
                            '& .MuiInputBase-input': {
                                fontSize: 16,
                            },
                        },
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingX: 2 }}>
                <Typography sx={{ color: 'black.900', fontSize: 16, fontWeight: 500 }}>
                    Amenities
                </Typography>
                <GroupedAmenities
                    selectedAmenities={amenities}
                    onSelectedAmenity={setAmenities}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, paddingX: 2 }}>
                <Typography sx={{ color: 'black.900', fontSize: 16, fontWeight: 500 }}>
                    Key Features
                </Typography>
                <GroupedKeyFeatures
                    selectedKeyFeatures={keyFeatures}
                    onSelectedKeyFeature={setKeyFeatures}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, padding: 2 }}>
                <Button sx={{ width: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'white.50', color: '#5C5C5C', border: '1px solid #E0E0E0', ":hover": { borderColor: 'black.900' }, borderRadius: 2 }} onClick={onEditRoomType} disabled={isLoading}>
                    Cancel
                </Button>
                <Button sx={{ width: 100, fontSize: 14, fontWeight: 600, textTransform: 'none', padding: '8px 24px', bgcolor: 'primary.500', color: 'white.50', border: '1px solid #FF385C', ":hover": { bgcolor: 'primary.600' }, borderRadius: 2, ":disabled": { bgcolor: 'gray.200', color: 'gray.400', borderColor: 'gray.200' } }} onClick={handleConfirm} disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                </Button>
            </Box>
        </Box>
    )
}

export default EditRoomType
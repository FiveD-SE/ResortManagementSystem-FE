import React from "react";
import {
    Box,
    IconButton,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tabs,
    Tab,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    MoreHoriz,
    Apps,
    CheckCircle,
    CancelRounded,
    DoDisturbOffRounded,
    Add,
} from "@mui/icons-material";
import AddPromotionModal from "./AddPromotionModal";
import ViewDetailPromotionModal from "./ViewDetailPromotionModal";
import { IPromotion, IPromotionApiResponse } from "../../../types";
import PopupModal from "../../../components/PopupModal";
import { useDeletePromotionMutation } from "../../../apis/promotionApi";
import toast from "react-hot-toast";

const tabTextStyle = {
    color: "gray.200",
    fontWeight: 600,
    fontSize: "16px",
    textTransform: "none",
    "&.Mui-selected": {
        color: "primary.500",
    },
};

const tabIconStyle = {
    fontSize: "18px",
};

interface PromotionTableProps {
    promotionData: IPromotionApiResponse | undefined;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}
const PromotionTable = ({ promotionData, onPageChange }: PromotionTableProps) => {
    const [openAddPromotionModal, setOpenAddPromotionModal] = React.useState<boolean>(false);
    const [openViewDetailPromotionModal, setOpenViewDetailPromotionModal] = React.useState<boolean>(false);
    const [tabSelected, setTabSelected] = React.useState<number>(0);
    const [search, setSearch] = React.useState<string>("");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedPromotion, setSelectedPromotion] = React.useState<IPromotion>();
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);

    const [deletePromotionMutation, { isLoading }] = useDeletePromotionMutation();

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const filteredRows = promotionData?.docs.filter((row) => {
        const currentDate = new Date();
        const startDate = new Date(row.startDate);
        const endDate = new Date(row.endDate);

        const matchTab =
            tabSelected === 0 ||
            (tabSelected === 1 && startDate < currentDate && endDate > currentDate) ||
            (tabSelected === 2 && startDate > currentDate) ||
            (tabSelected === 3 && endDate < currentDate);

        const matchSearch =
            row.promotionName.toLowerCase().includes(search.toLowerCase()) ||
            (row.description ?? "").toLowerCase().includes(search.toLowerCase()) ||
            row.discount.toString().includes(search);
        return matchTab && matchSearch;
    });

    const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setTabSelected(newValue);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleDeletePromotion = async () => {
        if (selectedPromotion) {
            await deletePromotionMutation(selectedPromotion.id).unwrap();
            try {
                toast.success("Promotion deleted successfully");
            } catch (error) {
                toast.error("Failed to delete promotion");
            } finally {
                setOpenDeleteModal(false);
            }
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {/* Custom Tabs */}
                <Tabs
                    value={tabSelected}
                    onChange={handleTabChange}
                    aria-label="custom tabs example"
                    TabIndicatorProps={{ style: { backgroundColor: "black.900", bottom: "12px" } }}
                    sx={{
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: "12px",
                            left: 0,
                            right: 0,
                            height: "1px",
                            backgroundColor: "gray.200",
                            zIndex: -1,
                        },
                    }}
                >
                    <Tab label="All promotions" sx={tabTextStyle} icon={<Apps sx={tabIconStyle} />} iconPosition="start" disableRipple />
                    <Tab label="Active" sx={tabTextStyle} icon={<CheckCircle sx={tabIconStyle} />} iconPosition="start" disableRipple />
                    <Tab label="Inactive" sx={tabTextStyle} icon={<CancelRounded sx={tabIconStyle} />} iconPosition="start" disableRipple />
                    <Tab label="Expired" sx={tabTextStyle} icon={<DoDisturbOffRounded sx={tabIconStyle} />} iconPosition="start" disableRipple />
                </Tabs>

                {/* Search and Button */}
                <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    {/* Search */}
                    <TextField
                        id="search"
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={handleSearchChange}
                        sx={{
                            bgcolor: "white",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                "& fieldset": {
                                    borderColor: "gray.200",
                                },
                                "&:hover fieldset": {
                                    borderColor: "gray.200",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "primary.500",
                                    borderWidth: 1.5,
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "gray.500",
                                "&.Mui-focused": {
                                    color: "primary.500",
                                },
                            },
                        }}
                    />
                    {/* Add Button */}
                    <Button
                        sx={{
                            bgcolor: "primary.500",
                            color: "white.50",
                            ":hover": { bgcolor: "primary.600" },
                            padding: "8px 16px",
                            textTransform: "none",
                            borderRadius: 2,
                        }}
                        startIcon={<Add />}
                        onClick={() => setOpenAddPromotionModal(true)}
                    >
                        Add New Promotion
                    </Button>
                </Box>
            </Box>

            {/* Table */}
            <Box sx={{ minHeight: "85vh", borderRadius: 2, border: "1px solid rgb(222, 222, 222)" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Discount (%)</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(filteredRows ?? []).length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        {search ? `No results found for "${search}".` : "No promotions available."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                (filteredRows ?? []).map((row, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{index}</TableCell>
                                        <TableCell>{row.promotionName}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.discount}</TableCell>
                                        <TableCell>{new Date(row.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(row.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={(event) => {
                                                setAnchorEl(event.currentTarget);
                                                setSelectedPromotion(row);
                                            }}>
                                                <MoreHoriz />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{
                                    '& .MuiPaper-root': {
                                        borderRadius: '8px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                        padding: '4px',
                                        minWidth: '100px',
                                    },
                                    '& .MuiMenuItem-root': {
                                        padding: '4px 16px',
                                        borderRadius: '4px',
                                        '&:hover': {
                                            backgroundColor: 'gray.50',
                                        },
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        color: 'black.300',
                                    },
                                }}
                            >
                                <MenuItem onClick={() => {
                                    setOpenViewDetailPromotionModal(true);
                                    handleMenuClose();
                                }}>
                                    View Detail
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    setOpenDeleteModal(true);
                                    handleMenuClose();
                                }}>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Pagination */}
            <Pagination
                count={promotionData?.totalPages ?? 0}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2, alignSelf: "flex-end" }}
                onChange={onPageChange}
            />

            {/* Modals */}
            <AddPromotionModal open={openAddPromotionModal} onClose={() => setOpenAddPromotionModal(false)} />
            <ViewDetailPromotionModal open={openViewDetailPromotionModal} onClose={() => setOpenViewDetailPromotionModal(false)} selectedPromotion={selectedPromotion} />

            {/* Popup Modal */}
            <PopupModal
                type="delete"
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                title="Delete Promotion"
                message="Are you sure you want to delete this promotion?"
                onConfirm={handleDeletePromotion}
                isLoading={isLoading}
            />
        </Box>
    );
};

export default PromotionTable;

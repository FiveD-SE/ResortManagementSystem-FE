import { Add, ArrowBackIosNewRounded, MoreHoriz } from '@mui/icons-material';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  TextField,
  MenuItem,
  Menu,
} from '@mui/material';
import { IRoomType, IRoomTypeApiResponse } from '../../../types';
import { useDeleteRoomTypeMutation } from '../../../apis/roomTypeApi';
import PopupModal from '../../../components/PopupModal';
import toast from 'react-hot-toast';
import React from 'react';
import { formatPrice } from '../../../utils';

interface RoomTypeManagementProps {
  onManageRoomType: () => void;
  onAddNewRoomType: () => void;
  onEditRoomType: (roomType: IRoomType | undefined) => void;
  roomTypesData: IRoomTypeApiResponse | undefined;
  onRefetch: () => void;
}

const RoomTypeManagement = ({
  onManageRoomType,
  onAddNewRoomType,
  onEditRoomType,
  roomTypesData,
  onRefetch,
}: RoomTypeManagementProps) => {
  const [search, setSearch] = React.useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRoomType, setSelectedRoomType] = React.useState<IRoomType>();
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [deleteRoomType, { isLoading }] = useDeleteRoomTypeMutation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: IRoomType) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoomType(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDeleteRoomType = async () => {
    if (!selectedRoomType) return;
    try {
      await deleteRoomType(selectedRoomType.id);
      toast.success('Room type deleted successfully');
    } catch {
      toast.error('Failed to delete room type');
    } finally {
      onRefetch();
      setOpenDeleteModal(false);
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const filteredRoomTypes = React.useMemo(() => {
    if (!roomTypesData?.docs) return [];
    const docsInCurrentPage = roomTypesData?.docs.slice((currentPage - 1) * 10, currentPage * 10);

    const searchLower = search.toLowerCase();
    return docsInCurrentPage.filter(
      (row) =>
        row.typeName.toLowerCase().includes(searchLower) ||
        row.description?.toLowerCase().includes(searchLower) ||
        '' ||
        row.basePrice.toString().includes(searchLower),
    );
  }, [roomTypesData, search, currentPage]);

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
        onClick={onManageRoomType}
      >
        Back
      </Button>
      <Typography sx={{ color: 'black.900', fontSize: 20, fontWeight: 600 }}>Room Type</Typography>

      {/* Search and Button */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 2 }}>
        {/* Search */}
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          size="small"
          sx={{
            bgcolor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '& fieldset': {
                borderColor: 'gray.200',
              },
              '&:hover fieldset': {
                borderColor: 'gray.200',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.500',
                borderWidth: 1.5,
              },
            },
            '& .MuiInputLabel-root': {
              color: 'gray.500',
              '&.Mui-focused': {
                color: 'primary.500',
              },
            },
          }}
          value={search}
          onChange={handleSearchChange}
        />
        {/* Button */}
        <Button
          sx={{
            bgcolor: 'primary.500',
            color: 'white.50',
            ':hover': { bgcolor: 'primary.600' },
            padding: '8px 16px',
            textTransform: 'none',
            borderRadius: 2,
          }}
          startIcon={<Add />}
          onClick={onAddNewRoomType}
        >
          Add New Room Type
        </Button>
      </Box>

      <Box sx={{ minHeight: '85vh', borderRadius: 2, border: '1px solid rgb(222, 222, 222)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'rgb(222, 222, 222)' }}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRoomTypes.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.typeName}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{formatPrice(row.basePrice)}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                      <MoreHoriz />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
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
                <MenuItem
                  onClick={() => {
                    onEditRoomType(selectedRoomType);
                    handleMenuClose();
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpenDeleteModal(true);
                    handleMenuClose();
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Pagination
        count={Math.ceil((roomTypesData?.totalDocs || 0) / 10)}
        variant="outlined"
        shape="rounded"
        sx={{ marginTop: 2, alignSelf: 'flex-end' }}
        page={currentPage}
        onChange={handlePageChange}
      />

      <PopupModal
        type="delete"
        open={openDeleteModal}
        title="Delete Room Type"
        message="Are you sure you want to delete this room type?"
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteRoomType}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default RoomTypeManagement;

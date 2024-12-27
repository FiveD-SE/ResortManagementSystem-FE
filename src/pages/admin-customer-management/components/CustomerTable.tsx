import { Apps, Circle, FiberManualRecord, MoreHoriz, NotificationsActive } from "@mui/icons-material";
import { Box, IconButton, Pagination, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";

const tabTextStyle = {
    color: 'gray.200',
    fontWeight: 600,
    fontSize: '16px',
    textTransform: 'none',
    '&.Mui-selected': {
        color: 'primary.500',
    },
};

const tabIconStyle = {
    fontSize: '18px',
};

interface DataRow {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
}

const rows: DataRow[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        phone: '123456789',
        address: '123 Main St, New York, NY 10030',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        phone: '123456789',
        address: '123 Main St, New York, NY 10030',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Alice',
        email: 'alice@gmail.com',
        phone: '123456789',
        address: '123 Main St, New York, NY 10030',
        status: 'Inactive',
    }
];

const CustomerTable = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Custom Tabs */}
                <Tabs
                    aria-label="custom tabs example"
                    TabIndicatorProps={{ style: { backgroundColor: 'black.900', bottom: '12px' } }}
                    sx={{
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: '12px',
                            left: 0,
                            right: 0,
                            height: '1px',
                            backgroundColor: 'rgb(222, 222, 222)',
                            zIndex: -1,
                        },
                    }}
                    value={0}
                >
                    <Tab
                        label="All customers"
                        sx={tabTextStyle}
                        icon={<Apps sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Active"
                        sx={tabTextStyle}
                        icon={<NotificationsActive sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                    <Tab
                        label="Suspended"
                        sx={tabTextStyle}
                        icon={<Circle sx={tabIconStyle} />}
                        iconPosition='start'
                        disableRipple
                    />
                </Tabs>

                {/* Search and Button */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
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
                    />
                </Box>
            </Box>
            <Box sx={{ height: "85vh", borderRadius: 2, border: "1px solid rgb(222, 222, 222)" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>
                                        {row.status.toLowerCase() === "active" ? (
                                            <Typography
                                                sx={{
                                                    color: "black.900",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <FiberManualRecord
                                                    color="success"
                                                    sx={{ height: 15, width: 15, padding: 0, margin: 0 }}
                                                />
                                                {row.status}
                                            </Typography>
                                        ) : (
                                            <Typography
                                                sx={{
                                                    color: "black.900",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <FiberManualRecord
                                                    sx={{
                                                        color: "gray.200",
                                                        height: 15,
                                                        width: 15,
                                                        padding: 0,
                                                        margin: 0,
                                                    }}
                                                />
                                                {row.status}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <MoreHoriz />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2, alignSelf: 'flex-end' }}
            />
        </Box>
    );
};

export default CustomerTable;

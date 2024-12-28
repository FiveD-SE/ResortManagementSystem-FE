import { AccountCircleRounded, DiscountRounded, FactCheck, GridView, HailRounded, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Logout, RoomPreferences, RoomServiceRounded, SupervisorAccountRounded } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, List, Typography } from "@mui/material"
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import PopupModal from "./PopupModal";

const MENUS = {
    LOGOUT: 'logout',
    PROFILE: 'profile',
};

const SidebarItems = [
    {
        name: 'dashboard',
        icon: <GridView />,
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        name: 'staff-management',
        icon: <HailRounded />,
        title: 'Staff Management',
        href: '/admin/staff-management',
    },
    {
        name: 'customer-management',
        icon: <SupervisorAccountRounded />,
        title: 'Customer Management',
        href: '/admin/customer-management',
    },
    {
        name: 'room-management',
        icon: <RoomPreferences />,
        title: 'Room Management',
        href: '/admin/room-management',
    },
    {
        name: 'service-management',
        icon: <RoomServiceRounded />,
        title: 'Service Management',
        href: '/admin/service-management',
    },
    {
        name: 'promotion-management',
        icon: <DiscountRounded />,
        title: 'Promotion Management',
        href: '/admin/promotion-management',
    },
    {
        name: 'booking-management',
        icon: <FactCheck />,
        title: 'Booking Management',
        href: '/admin/booking-management',
    },
];

const Sidebar = () => {
    const [openSideBar, setOpenSideBar] = useState<boolean>(true);
    const [selectedMenu, setSelectedMenu] = useState<string>('/admin/dashboard');
    const [openPopupModal, setOpenPopupModal] = useState<boolean>(false);
    const drawerWidth = openSideBar ? '20rem' : '5rem';
    const drawerTransition = '0.2s ease';
    const navigate = useNavigate();

    const handleSelectMenu = (menu: { name: string; href?: string }) => {
        if (menu.name === MENUS.LOGOUT) {
            setOpenPopupModal(true);
        } else {
            setSelectedMenu(menu.name);
            if (menu.href) navigate(menu.href);
        }
    };

    return (
        <Drawer
            variant="permanent"
            open={openSideBar}
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    transition: drawerTransition,
                    overflow: 'hidden',
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', p: 2, backgroundColor: 'white.50' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: openSideBar ? 'flex-start' : 'center' }} onClick={() => setOpenSideBar(!openSideBar)}>
                    {openSideBar && (
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: 1,
                                cursor: 'pointer',
                                userSelect: 'none',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: 22,
                                    fontWeight: 500,
                                    color: 'black.900',
                                }}
                            >
                                brand
                                <Typography
                                    component={'span'}
                                    sx={{
                                        fontSize: 22,
                                        fontWeight: 500,
                                        color: 'primary.500',
                                    }}
                                >
                                    name
                                </Typography>
                            </Typography>
                        </Box>
                    )}
                    <IconButton
                        onClick={() => setOpenSideBar(!openSideBar)}
                        sx={{ color: 'black.900', fontSize: 20, '&:hover': { backgroundColor: 'primary.500', color: 'white.50' } }}
                    >
                        {openSideBar ? <KeyboardDoubleArrowLeft fontSize="inherit" /> : <KeyboardDoubleArrowRight fontSize="inherit" />}
                    </IconButton>
                </Box>

                <Box flex={1}>
                    {SidebarItems.map((item) =>
                        <SidebarItem
                            key={item.name}
                            name={item.name}
                            icon={item.icon}
                            title={item.title}
                            selectedMenu={selectedMenu}
                            openSideBar={openSideBar}
                            onClick={() => handleSelectMenu({ name: item.name, href: item.href })}
                        />
                    )}

                </Box>

                <Divider sx={{ my: 2 }} />

                <List>
                    <SidebarItem
                        icon={<Logout />}
                        name={MENUS.LOGOUT}
                        title={'Logout'}
                        selectedMenu={selectedMenu}
                        openSideBar={openSideBar}
                        onClick={() => handleSelectMenu({ name: MENUS.LOGOUT, href: '/' })}
                    />

                    <SidebarItem
                        icon={<AccountCircleRounded />}
                        name={MENUS.PROFILE}
                        title={'Profile'}
                        selectedMenu={selectedMenu}
                        openSideBar={openSideBar}
                        onClick={() => handleSelectMenu({ name: MENUS.PROFILE, href: '/admin/profile' })}
                    />
                </List>
            </Box>

            <PopupModal
                type={'confirm'}
                open={openPopupModal}
                title={'Logout'}
                message={'Are you sure you want to logout?'}
                onClose={() => (setOpenPopupModal(false))}
                onConfirm={() => (setOpenPopupModal(false))}
            />
        </Drawer>
    )
}

export default Sidebar
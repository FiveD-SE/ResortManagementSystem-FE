import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";

interface SidebarItemProps {
    name: string;
    icon: React.ReactNode;
    title: string;
    selectedMenu: string | null;
    openSideBar: boolean;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ name, icon, title, selectedMenu, openSideBar, onClick }) => {
    const isSelected = selectedMenu === name;

    const itemStyles = {
        mb: 1,
        justifyContent: openSideBar ? "flex-start" : "center",
        borderRadius: "8px",
        padding: openSideBar ? "0.5rem 1rem" : "0.5rem",
        backgroundColor: isSelected ? "primary.500" : "transparent",
        "&:hover": {
            backgroundColor: isSelected ? "primary.500" : "primary.50",
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: !isSelected ? "primary.500" : "white.50",
            },
        },
        userSelect: "none",
        cursor: "pointer",
    };

    return (
        <Tooltip title={!openSideBar ? title : ""} placement="right" arrow>
            <ListItem disablePadding onClick={onClick} sx={itemStyles}>
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: openSideBar ? 2 : 0,
                        justifyContent: "center",
                        fontSize: 20,
                        color: isSelected ? "white.50" : "black.500",
                    }}
                >
                    {icon}
                </ListItemIcon>
                {openSideBar && (
                    <ListItemText
                        primary={title}
                        sx={{
                            "& .MuiListItemText-primary": {
                                fontSize: "1rem",
                                whiteSpace: "nowrap",
                                color: isSelected ? "white.50" : "black.500",
                                fontWeight: isSelected ? 600 : 400,
                            },
                        }}
                    />
                )}
            </ListItem>
        </Tooltip>
    );
};

export default SidebarItem;

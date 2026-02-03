"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useRouter } from "next/navigation";
import { buildDesktopNavBarItems, buildDesktopSettingsMenuItems } from "./config/navConfig";

export default function DesktopNavbar({
    isLoggedIn = false,
    isManager = false,

}) {
    const router = useRouter();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const items = React.useMemo(
        () => buildDesktopNavBarItems({ isLoggedIn, isManager, webView: true }),
        [isLoggedIn, isManager]
    );

    const settings = React.useMemo(
        () => buildDesktopSettingsMenuItems({ isLoggedIn, isManager, webView: true }),
        [isLoggedIn, isManager]
    );

    React.useEffect(() => {
        console.log({ isLoggedIn, isManager, items });
    }, [isLoggedIn, isManager, items]);


    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const go = (path) => router.push(path);

    return (
        <AppBar position="static" sx={{ display: { xs: "none", md: "block" } }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Desktop logo */}
                    <AdbIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="button"
                        onClick={() => go("/")}
                        sx={{
                            mr: 2,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            background: "transparent",
                            border: 0,
                            cursor: "pointer",
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Desktop nav items */}
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        {items.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Button
                                    key={item.value}
                                    onClick={() => go(item.redirectLink)}
                                    sx={{ my: 2, color: "white", display: "flex", gap: 1 }}
                                >
                                    <Icon sx={{ pl: 1 }} />
                                    {item.navName}
                                </Button>
                            );
                        })}
                    </Box>

                    {/* User avatar menu */}
                    {isLoggedIn && (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                                aria-controls="menu-user"
                                aria-haspopup="true"
                            >
                                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            id="menu-user"
                            sx={{ mt: "45px" }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.value}
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        if (setting.redirectLink) {
                                            router.push(setting.redirectLink);
                                        }
                                    }}
                                >
                                    <Typography textAlign="center"><setting.icon sx={{ mr: 1 }} />{setting.navName}</Typography>
                            
                                </MenuItem>
                            ))}
                
        </Menu>
    </Box>
    )}
    <Button variant="contained" color="primary"onClick={() => go(isLoggedIn ? "/logout" : "/login")} sx={{ ml: 2 }}>
        {isLoggedIn ? "Logout" : "Login"}
    </Button>
</Toolbar>
            </Container>
        </AppBar>
    );
}

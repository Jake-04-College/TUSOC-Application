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
import { LoginButton, LogoutButton } from "../buttons/buttons";

export default function DesktopNavbar({ session, status, isLoggedIn }) {
    const isManager = null;
    const avatarSrc = session?.user?.profilePic || session?.user?.image || undefined;
    const avatarFallback = session?.user?.username?.charAt(0)?.toUpperCase() || session?.user?.name?.charAt(0)?.toUpperCase() || "U";

    const router = useRouter();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const items = React.useMemo(
        () => buildDesktopNavBarItems({ isLoggedIn, isManager, webView: true }),
        [isLoggedIn, isManager]
    );

    const settings = React.useMemo(
        () => buildDesktopSettingsMenuItems({
            isLoggedIn,
            isManager,
            webView: true,
            userID: session?.user?.id,
        }),
        [isLoggedIn, isManager, session?.user?.id]
    );

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const go = (path) => router.push(path);

    return (
        <AppBar position="static" sx={{ display: { xs: "none", md: "block" } }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                        TUSOC
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.value}
                                    onClick={() => go(item.redirectLink)}
                                    sx={{ my: 2, color: "white", display: "flex", gap: 1 }}
                                >
                                    {Icon ? <Icon sx={{ pl: 1 }} /> : null}
                                    {item.navName}
                                </Button>
                            );
                        })}
                    </Box>

                    {isLoggedIn && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                    aria-controls="menu-user"
                                    aria-haspopup="true"
                                >
                                    <Avatar src={avatarSrc}>{!avatarSrc ? avatarFallback : null}</Avatar>
                                </IconButton>
                            </Tooltip>

                            <Menu
                                id="menu-user"
                                sx={{ mt: "45px" }}
                                anchorEl={anchorElUser}
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => {
                                    const SettingIcon = setting.icon;
                                    return (
                                        <MenuItem
                                            key={setting.value}
                                            onClick={() => {
                                                handleCloseUserMenu();
                                                if (setting.redirectLink) router.push(setting.redirectLink);
                                            }}
                                        >
                                            <Typography
                                                textAlign="center"
                                                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                            >
                                                {SettingIcon ? <SettingIcon /> : null}
                                                {setting.navName}
                                            </Typography>
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                        </Box>
                    )}

                    {status !== "loading" && (isLoggedIn ? <LogoutButton /> : <LoginButton />)}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

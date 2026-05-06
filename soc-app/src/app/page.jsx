"use client";

import * as React from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { SSOLoginButton, LoginButton, RedirectButton } from './components/buttons/buttons';
import NavBar from './components/navbar/Navbar';

export default function StartPage() {
    return(
        <>
            <CssBaseline />
            <NavBar />

            <Container maxWidth="lg">
                <Box
                    sx={{
                        mt: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "80vh",
                        gap: 3,
                    }}
                >
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 800, textAlign: "center", mb: 2 }}>
                        Welcome to the TU Dublin Society Portal
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}>
                        Connect with clubs and societies across TU Dublin
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: { xs: "100%", sm: "400px" },
                        }}
                    >
                        <LoginButton text="Login" link="/login" />
                        <SSOLoginButton/>
                        <RedirectButton text="Sign up with Credentials" link="/register" />
                    </Box>
                </Box>
            </Container>
        </>
    );
}
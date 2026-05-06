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

            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
                <Box
                    sx={{
                        mt: { xs: 4, sm: 8 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: { xs: "auto", sm: "80vh" },
                        gap: { xs: 2, sm: 3 },
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            textAlign: "center",
                            mb: 1,
                            fontSize: { xs: "2rem", sm: "3rem" },
                        }}
                    >
                        Welcome to the TU Dublin Society Portal
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            color: "text.secondary",
                            mb: { xs: 2, sm: 4 },
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                    >
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
                        <LoginButton fullWidth />
                        <SSOLoginButton fullWidth />
                        <RedirectButton text="Sign up with Credentials" link="/register" fullWidth />
                    </Box>
                </Box>
            </Container>
        </>
    );
}
"use client";

import * as React from "react";
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import Navbar from "../components/navbar/Navbar";

export default function SocietyPage() {
    return (
        <>
            <CssBaseline />
            <Navbar />

            <Box>
              <Typography variant="h4" component="h1" align="center" sx={{ mb: 3 }}>
                            Media Feed
                        </Typography>
            </Box>
        </>
    );
}

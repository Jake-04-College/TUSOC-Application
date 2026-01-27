"use client";

import * as React from "react";
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";

export default function SocietyPage() {
    return (
        <>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar />
            </AppBar>

            <Box>
              <Typography variant="h4" component="h1" align="center" sx={{ mb: 3 }}>
                            Media Feed
                        </Typography>
            </Box>
        </>
    );
}

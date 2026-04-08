"use client";

import * as React from "react";
import {AppBar, Box, Container, CssBaseline, Toolbar, Typography, Grid } from "@mui/material";

export default function AdminPanel() {
    return (
        <>
            <CssBaseline />

            <AppBar position="static">
                <Typography variant="h5">Administration Panel</Typography>
                <Toolbar />
            </AppBar>

            <Grid container minHeight="100vh">
                <Grid
                    item
                    xs={12}
                    md={3}
                    sx={{
                        borderRight: "1px solid #e0e0e0",
                        p: 2
                    }}
                >
                    <Box display="flex" flexDirection="column" gap={2} mt={2}>
                        <button style={{height: 50, width: 200}}>Students</button>
                        <button style={{height: 50, width: 200}}>Societies</button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
